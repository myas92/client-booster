import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { Layout } from 'components/account';
import { userService, alertService } from 'services';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default Login;

function Login() {
    const { t } = useTranslation("common")
    const router = useRouter();
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password }) {
        return userService.login(username, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/dashboard';
                router.push(returnUrl);
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card">
                <h4 className="card-header">{t("login")}</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>{t("username")}</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>{t("password")}</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btn-primary">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            {t("login")}
                        </button>
                        <Link href="/account/register" className="btn btn-link">{t("register")}</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}