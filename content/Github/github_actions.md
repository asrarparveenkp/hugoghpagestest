+++
title = "Github Actions"
hide_author = "true"
+++

## Github Actions
Automate, customize, and execute your software development workflows right in your repository with GitHub Actions. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow.

-   An Action script is any Github event. Events include push, pull, issue, comment, a welcome new member on joining, clone, publish to PyPI, publish to a favorite cloud vendor, close stale issues, and many more, including your own unique code review tool.
-   If you want to automate a particular manual step, it is probably already coded, tested, and open-sourced as a Github Action script on GitHub MarketPlace.
-   You can use it for most computer languages.
-   You can use it for most hardware/OS environments, such as Ubuntu, Windows, and macOS.
-   You can use it for Continuous Deployment to Azure, AWS, Google, and other cloud platforms.


## Comparison

You can read the Comparison of Github Actions with Jenkins <a href="https://knapsackpro.com/ci_comparisons/jenkins/vs/github-actions">here</a>.


## Quickstart for GitHub Actions

### Introduction
You only need an existing GitHub repository to create and run a GitHub Actions workflow. In this guide, you'll add some workflows that will be triggered based on specified github events ex: push, pull_request etc

### Creating your first workflow
-   From your repository on GitHub, create a new file in the .github/workflows directory named simple.yml like shown in the picture

<img style="max-width: 70%" src="/Assets/Images/GithubActions/CreatingGithubActionsYMLFile.png" alt="Creating YML File" />

-   Copy the following YAML contents into the simple.yml file.


```
name: Shell Commands

# run this workflow on push event
on:
  push:
    

jobs: 
  # first job name
  run-shell-command:
    runs-on: ubuntu-latest    #github hosted runners
    # Defining the steps for the job "run-shell-command:"
    steps:
      # Step1 Running a bash command
      - name: echo a string             #name of the step
        run: echo "Hello World"         #script/command for the step
      
      # Step2 Running multiline scrips with the use of "|" 
      - name: multiline script
        run: |
          node -v
          npm -v
      
      # Step3
      - name: Python Command
        run: |
          import platform
          print(platform.processor())
        # specifying the shell for this particular step
        shell: python 

  run-windows-command:
    runs-on: windows-latest
    needs: ["run-shell-command"] #If you want this job to run after "run-shell-command" job
    steps:
      - name: Directory Powershell
        run: Get-Location
      - name: Directory Bash
        run: pwd
        shell: bash
```

-   To run your workflow, add, commit and push your code to the github repository.

Committing the workflow file in your repository triggers the push event and runs your workflow.

### Viewing your workflow results

-   Open your project in Github from the browser.
<img style="max-width: 70%" src="/Assets/Images/GithubActions/OpeningWorkflow1.png" alt="Github UI" />

-   Go to "Actions" tab
<img style="max-width: 70%" src="/Assets/Images/GithubActions/OpeningWorkflow2.png" alt="Github UI" />

-   You can see your jobs running/completed.
<img style="max-width: 70%" src="/Assets/Images/GithubActions/OpeningWorkflow3.png" alt="Github UI" />

-   You can inspect each step in every job.
<img style="max-width: 70%" src="/Assets/Images/GithubActions/OpeningWorkflow4.png" alt="Github UI" />

For more detailed explanation refer to <a href="https://docs.github.com/en/free-pro-team@latest/actions/quickstart">this</a>

### Some other use cases of Github actions workflow

-   <a href="https://github.dev.global.tesco.org/CoreDevOpsTools/github-actions-demo/blob/master/.github/workflows/matrix.yml">Link</a> to run our workflow on multiple operating systems and multiple node versions in GitHub workflows.
-   <a href="https://github.dev.global.tesco.org/CoreDevOpsTools/github-actions-demo/blob/master/.github/workflows/todocontainer.yml">Link</a> to pull docker images from docker-hub, configure ports and create containers in workflow
-   <a href="https://github.dev.global.tesco.org/CoreDevOpsTools/github-actions-demo/blob/master/.github/workflows/env.yml">Link</a> to use environment variables which GitHub provides and custom environment variables to use in our jobs.
-   <a href="https://github.dev.global.tesco.org/CoreDevOpsTools/github-actions-demo/blob/master/.github/workflows/context.yml">Link</a> to use some of the functions provided by GitHub to be used in workflow.
-   <a href="https://github.dev.global.tesco.org/CoreDevOpsTools/github-actions-demo/blob/master/.github/workflows/actions.yml">Link</a> to schedule our workflow using cron.

For more resources visit Github official <a href="https://docs.github.com/en/free-pro-team@latest/actions/quickstart">documentation.</a>


# Runners

A runner is responsible for running your jobs whenever an event happens and displays the results

-   ### Github hosted runner

    -   Linux, Windows, Mac virtual environments with commonly used pre-installed softwares.
    -   Maintained by GitHub
    -   You can not customise hardware configuration
    -   You can use GitHub hosted runner with free of cost on public repositories.
    -   For private repositories, Actions offers simple, pay-as-you-go pricing.

-   ### Self Hosted runner

    -   A machine you manage and maintain.
    -   You need to install the runner applications.
    -   You have more control of hardware, OS, software tools

    </br>
## TPC as Github Hosted Runner

-   Follow these steps to add runner in your repository   
        
    <img style="max-width: 70%" src="/Assets/Images/GithubActions/AddingSelfHostedRunner1.png" alt="Github UI" />

-   Click on "Settings" tab

    <img style="max-width: 70%" src="/Assets/Images/GithubActions/AddingSelfHostedRunner2.png" alt="Github UI" />
    
-   Click on "Actions" tab and Add runner

    <img style="max-width: 70%" src="/Assets/Images/GithubActions/AddingSelfHostedRunner3.png" alt="Github UI" />

-   Choose your operating system from drop down list.

    <img style="max-width: 70%" src="/Assets/Images/GithubActions/AddingSelfHostedRunner4.png" alt="Github UI" />

-   Now you have to run these commands in VM's terminal. It is assumed that you have spinned up TPC VM.

-   Login to your server in the terminal
    ```
    ssh TESCOGLOBAL+a-in2xxxxxxx@tpc0xxxxx.tgrc.tesco.org
    ```

-   Run the first three commands from the above picture in your VM.
    Example:
    ```
    mkdir actions-runner && cd actions-runner
    curl -O -L https://github.com/actions/runner/releases/download/v2.274.2/actions-runner-linux-x64-2.274.2.tar.gz
    tar xzf ./actions-runner-linux-x64-2.274.2.tar.gz
    ```

-   Now we need to add proxies to run next command. For this we need to update .env file.
    ```
    vim .env
    ```

-   Add these proxies and save the .env file
    ```
    LANG=en_GB.UTF-8
    https_proxy=http://uk-webproxy.edmz.tesco.org:80
    http_proxy=http://uk-webproxy.edmz.tesco.org:80
    ```

-   Now run this command. You can mention the name of your runner which can be used in the yml file and leave rest of the configuration to defalut.
    ```
    ./config.sh --url https://github.com/YOURORG/YOURREPOSITORY --token YOURTOKEN

    ```

-   Start the runner
    ```
    ./run.sh
    ```

-   Now update the runner in .yml file in your project repository.
    ```
        runs-on: YOURRUNNERNAME
    ```
</br>

## Tesco Azure as Github Hosted Runner

-   It is very similar to TPC.

-   Login to your Azure VM through terminal
    ```
    ssh username@IPADDRESS
    ```

-   We don't need proxies for Tesco Azure. Run the below commands on your VM's terminal. It will start the runner.

<img style="max-width: 70%" src="/Assets/Images/GithubActions/AddingSelfHostedRunner4.png" alt="Github UI" />

-   Now update the runner in .yml file in your project repository.
    ```
        runs-on: YOURRUNNERNAME
    ```


</br></br>
For more resources on self hosted runners, Please refer to this <a href="https://docs.github.com/en/free-pro-team@latest/actions/hosting-your-own-runners/adding-self-hosted-runners">documentation.</a>

</br>

### Configuring the self-hosted runner application as a service
</br>

### 1. Linux VM
-   For Linux systems that use systemd, you can use the svc.sh script distributed with the self-hosted runner application to install and manage using the application as a service.

-   On the runner machine, open a shell in the directory where you installed the self-hosted runner application. Use the commands below to install and manage the self-hosted runner service.

#### Installing the service
-   Stop the self-hosted runner application if it is currently running.

-   Install the service with the following command:
    ```
    sudo ./svc.sh install
    ```

#### Starting the service
-   Start the service with the following command:
    ```
    sudo ./svc.sh start
    ```

#### Checking the status of the service
-   Check the status of the service with the following command:
    ```
    sudo ./svc.sh status
    ```

#### Stopping the service
-   Stop the service with the following command:
    ```
    sudo ./svc.sh stop
    ```

#### Uninstalling the service
-   Stop the service if it is currently running.

-   Uninstall the service with the following command:
    ```
    sudo ./svc.sh uninstall
    ```

</br>

### 2. Mac VM
-   On the runner machine, open a shell in the directory where you installed the self-hosted runner application. Use the commands below to install and manage the self-hosted runner service.

#### Installing the service
-   Stop the self-hosted runner application if it is currently running.

-   Install the service with the following command:
    ```
    ./svc.sh install
    ```

#### Starting the service
-   Start the service with the following command:
    ```
    ./svc.sh start
    ```

#### Checking the status of the service
-   Check the status of the service with the following command:
    ```
    ./svc.sh status
    ```

#### Stopping the service
-   Stop the service with the following command:
    ```
    ./svc.sh stop
    ```

#### Uninstalling the service
-   Stop the service if it is currently running.

-   Uninstall the service with the following command:
    ```
    ./svc.sh uninstall
    ```

### 3. Windows VM
<p><b>Note:</b> Configuring the self-hosted runner application as a service on Windows is part of the application configuration process. If you have already configured the self-hosted runner application but did not choose to configure it as a service, you must remove the runner from GitHub and re-configure the application. When you re-configure the application, choose the option to configure the application as a service.</p>

-   You can manage the runner service in the Windows Services application, or you can use PowerShell to run the commands below.

#### Starting the service
-   Start the service with the following command:
    ```
    Start-Service "actions.runner.*"
    ```

#### Checking the status of the service
-   Check the status of the service with the following command:
    ```
    Get-Service "actions.runner.*"
    ```

#### Stopping the service
-   Stop the service with the following command:
    ```
    Stop-Service "actions.runner.*"
    ```

#### Uninstalling the service
-   Stop the service if it is currently running.

-   Uninstall the service with the following command:
    ```
    Remove-Service "actions.runner.*"
    ```

</br>
For more resources on self hosted runners as a service, Please refer to this <a href="https://docs.github.com/en/free-pro-team@latest/actions/hosting-your-own-runners/configuring-the-self-hosted-runner-application-as-a-service">documentation.</a>






