module.exports = (req) => {
    return {
        content: ` 
        <div class="h-screen flex flex-col text-center items-center justify-center">
            <div>
                <h1 class="text-5xl py-5">Error <span class="text-red-600">404</span> - Page Not Found</h1>
                <p class="text-xl text-slate-700">Sorry, the page you're looking for apparently is missing or not currently available</p>
            </div>
            <div class="flex justify-center gap-10 py-5">
                <a href="/" class="px-4 py-2 bg-sky-400 hover:bg-sky-300 active:scale-95 rounded-md hover:scale-110 transition duration-200 ease-out">Return to the Home Page</a>
                <a href="/posts" class="px-4 py-2 bg-green-400 hover:bg-green-300 active:scale-95 rounded-md hover:scale-110 transition duration-200 ease-out">Return to the Posts Page</a>
            </div>
        </div>
        `
    }
}