param(

    [parameter(Mandatory = $True)] [string]$subdomain,
    [alias("regions","reg", "rg")] [string[]]$region = @("westeurope", "northeurope"),
                                   [string]$primaryRegion = "westeurope"

)

#Requires -Modules @{ModuleName="Az.Dns";ModuleVersion="1.1.0"}

$regionShorts = @{"northeurope" = "eun"; "westeurope" = "euw"}

$Context = Get-AzContext
$TeamNumber = ($Context.Subscription.Name).Substring(0, 3)
$FQDN = "$subdomain.tescocloud.com"
$Initial = $False

foreach ( $Reg in $region ) {

    If ($regionShorts[$Reg]) {

        Try {

            $RegRG = New-AzResourceGroup -Name "$($regionShorts[$Reg])-dns-$TeamNumber-$subdomain" `
                                         -Location $Reg

            If ( -Not $Initial ) {

                $Initial = $True

                $ParentZone = New-AzDnsZone -Name $FQDN `
                                            -ResourceGroupName $RegRG.ResourceGroupName

                Write-Host "TescoZone | Created top level domain of $subdomain in $($RegRG.ResourceGroupName)"
                Write-Host "TescoZone | Please send the following NameServers to Networks (Paul Ellis):"
                $ParentZone.NameServers | ForEach-Object { Write-Host " > $_" }

            }

            $ChildZone = New-AzDnsZone -Name "$($regionShorts[$Reg]).$FQDN" `
                                       -ResourceGroupName $RegRG.ResourceGroupName

            $ChildNS = @()
            $ChildZone.NameServers | ForEach-Object { $ChildNS += New-AzDnsRecordConfig -Nsdname $_ }

            $ParentZone | New-AzDnsRecordSet -Name $regionShorts[$Reg] `
                                             -RecordType NS `
                                             -TTL 3600 `
                                             -DnsRecords $ChildNS

            Write-Host "TescoZone | Created DNSZone for $Reg."

        } Catch {

           Write-Error "TescoZone | Error creating RG or Zones. Ending."

        }

    } Else {

        Write-Error "TescoZone | Unable to locate region shortcode for $Reg. Ending."

    }

}