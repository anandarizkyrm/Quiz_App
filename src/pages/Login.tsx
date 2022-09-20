import { userDataFromLocalStorage } from '../atoms';
import InputError from '../components/InputError/InputError';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export interface formPayload {
  username: string;
  password: string;
}

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [userData, setUserData] = useAtom(userDataFromLocalStorage);

  const onSubmit = async (args: Partial<formPayload>) => {
    const tst = toast.loading('Loading..');
    if (args) {
      await setUserData(JSON.stringify(args));
      toast.success('Signed in!');
      toast.remove(tst);
    }
    return;
  };

  useEffect(() => {
    if (userData) {
      navigate('/', { replace: true });
    }
  }, [userData]);

  return (
    <section className="flex flex-col gap-4 pt-28 md:gap-8">
      <div className="w-full">
        <h1 className="text-4xl md:text-5xl mb-2 font-bold">
          Welcome to QuizzApp!
        </h1>
        <p className="text-sm">Please sign in to start the quiz app, dude.</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 max-w-md "
      >
        <h2 className="font-bold text-3xl">
          Signin to{' '}
          <span className="bg-clip-text text-transparent font-bold bg-gradient-to-r from-indigo-600 to-gray-400">
            QuizzApp
          </span>
        </h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            placeholder="Your QuizzApp username address"
            autoComplete="off"
            type="text"
            {...register('username', { required: true })}
            className={`${
              errors.username ? 'border-red-600' : 'border-gray-600'
            } rounded-lg p-2 px-3 input-color outline-none  border placeholder:text-sm md:placeholder:text-base`}
          />
          {errors.username && <InputError msg={'Username is required.'} />}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              autoComplete="off"
              id="password"
              placeholder="Your QuizzApp password"
              type="password"
              {...register('password', { required: true })}
              className={`${
                errors.password ? 'border-red-600' : 'border-gray-600'
              } rounded-lg p-2 px-3 input-color outline-none  border placeholder:text-sm md:placeholder:text-base w-full`}
            />
            {errors.password && <InputError msg={'Password is required.'} />}
          </div>
          <a
            className="max-w-max border-0 p-0 ml-auto text-error-1"
            href="/forgot-password"
          >
            Reset All ?
          </a>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2.5">
          <button className="inline-flex items-center justify-center rounded-lg outline-none transition-all focus-visible:ring  bg-blue-900 gray-1 hover:bg-blue-700 w-full py-2.5 px-6 font-semibold">
            Signin
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
