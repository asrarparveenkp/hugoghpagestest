var idx, searchInput, searchResults = null
var documents = []

function renderSearchResults(results){

    if (results.length > 0) {

        $('#results-container').css("display", "block")

        // show max 10 results
        if (results.length > 9){
            results = results.slice(0,10)
        }

        // reset search results
        searchResults.innerHTML = ''

        // append results
        results.forEach(result => {

            // create result item
            var article = document.createElement('li')
            article.tabIndex = 0
            article.innerHTML = `
                <a href="${result.ref}" title="${documents[result.ref].title}">
                    <span>${documents[result.ref].title}</span><br>
                    <span class="subtype">${documents[result.ref].category}</span>
                </a>
            `

            searchResults.appendChild(article)
        })

    // if results are empty
    } else {
        searchResults.innerHTML = '<li>No results found.</li>'
    }
}

function registerSearchHandler() {

    var container = $('.search_box')

    // register on input event
    searchInput.oninput = function(event) {

        // remove search results if the user empties the search input field
        if (searchInput.value == '') {

            searchResults.innerHTML = '<li>Type in your search query.</li>'

        } else {

            // get input value
            var query = event.target.value

            // run fuzzy search
            var results = idx.search(query + '*')

            // render results
            renderSearchResults(results)
        }
    }

    $(document).mouseup(function (e) {
        if (!container.is(e.target) && container.has(e.target).length == 0) {
            searchResults.innerHTML = '<li>Type in your search query.</li>'
            $('#results-container').css("display", "none")
        }
    });
}

function initLunr(jsonIndex) {

    // get dom elements
    searchInput = document.getElementById('search-input')
    searchResults = document.getElementById('results-container')

    // request and index documents
    fetch(jsonIndex, {
        method: 'get'
    }).then(
        res => res.json()
    ).then(
        res => {

            // index document
            idx = lunr(function() {
                this.ref('url')
                this.field('title')
                this.field('content')

                res.forEach(function(doc) {
                    this.add(doc)
                    documents[doc.url] = {
                        'title': doc.title,
                        'content': doc.content,
                        'category': doc.category.replace(/[^a-zA-Z0-9]/g,' '),
                        'date': doc.date
                    }
                }, this)
            })

            // data is loaded, next register handler
            registerSearchHandler()
        }
    ).catch(
        err => {
            searchResults.innerHTML = `<p>${err}</p>`
        }
    )
}
