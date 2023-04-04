searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value}`
})

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends'
})

let historyArr = []

arrowBtn.addEventListener('click', () => {
    history.back()
    location.hash = '#home'

    if (historyArr.length > 1) {
        location.hash = historyArr[historyArr.length - 2]
        historyArr.splice(-2, 2)
    } else {
        historyArr.pop()
        location.hash = "#home"
    }
})

window.addEventListener('DOMContentLoaded', navegator, false)
window.addEventListener('hashchange', navegator, false)

function navegator() {
    if (location.hash.startsWith('#trends')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')) {
        searchPage()
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage()
    } else if (location.hash.startsWith('#categories=')) {
        categoriesPage()
    } else {
        homePage()
    }

    if (location.hash.startsWith("#trends") || location.hash.startsWith("#search=") || location.hash.startsWith("#movie=") || location.hash.startsWith("#category=")) {
        historyArr.push(location.hash)
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0


}

function homePage() {
    console.log('HOME')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')

    arrowBtn.classList.add('inactive')

    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview();
    getCategoriesPreview()
}

function searchPage() {
    console.log('SEARCH')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')

    arrowBtn.classList.remove('inactive')

    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, query] = location.hash.split('=');
    getMoviesByQuery(query)

}

function trendsPage() {
    console.log('TRENDS')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')

    arrowBtn.classList.remove('inactive')

    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Trends'

    getTrendingMovies()
}

function movieDetailsPage() {
    console.log('MOVIES')

    headerSection.classList.add('header-container--long')
    // headerSection.style.background = ''
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')

    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')

    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId)
}

function categoriesPage() {
    console.log('CATEGORIES')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')

    arrowBtn.classList.remove('inactive')

    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}