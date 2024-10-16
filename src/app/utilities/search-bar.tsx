
export default function SearchBar({isOrder, onOrderChange }: {
    isOrder: string,
    onOrderChange: () => void;
}) {
    

    return (
      <>
        <div className="flex items-center justify-center max-w-lg mx-auto m-4">
          <button onClick={onOrderChange} id="drop-down" type="button" className="text-main-2 bg-secondary-2 hover:bg-main-1 rounded-md rounded-r-none text-sm px-5 py-4"> Order By: 
            <span> {isOrder}</span>
          </button>
          <form className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-4 h-4 text-secondary-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search-bar"
                className="block w-full p-4 pl-10 text-sm text-secondary-2 rounded-md rounded-l-none bg-main-2 font-body-text"
                placeholder="Search Products"
              />
              <button type="submit" className="text-main-2 absolute right-2.5 bottom-2.5 bg-secondary-2 hover:bg-main-1 rounded-md text-sm px-4 py-2"> Search </button>
            </div>
          </form>
        </div>
      </>
    );
  }
  