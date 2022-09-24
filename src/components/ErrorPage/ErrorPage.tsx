interface ErrorPage {
  code: number;
  msg: string;
}

const ErrorPage = ({
  code = 404,
  msg = 'Page Not Found',
}: Partial<ErrorPage>) => (
  <div className="flex items-center justify-center w-full h-screen">
    <section className="flex flex-col text-center">
      <h1 className="mb-4">
        {code}| {msg}
      </h1>
      <p className="mb-6">The page you&apos;re looking for are not found 🔍</p>
      <a
        className="inline-flex items-center justify-center font-semibold py-2.5 px-4 rounded-lg transition-all bg-primary-5 text-theme-1 hover:bg-primary-6 ring-primary-5 dark:ring-primary-4 focus-visible:ring max-w-max mx-auto gap-2"
        href="/"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 20 20"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Homepage</span>
      </a>
    </section>
  </div>
);

export default ErrorPage;
