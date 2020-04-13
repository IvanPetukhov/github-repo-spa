import * as React from 'react';
import { Link } from 'react-router-dom';
import './repo.css';

export const Repo = ({ repoData, ids }) => {
    const goBack = () => {
        window.history.back();
    };

    return repoData ? (
        <div className='repo'>
            <div className='repo__header'>
                <div className='repo__title'>
                    { repoData.full_name }
                </div>
                <div className='repo__links'>
                    <a href={ repoData.html_url } target='_blank'>GitHub</a>
                    <div onClick={ goBack } className='repo__linkBack'>Вернуться к списку</div>
                </div>
            </div>
            <div className='repo__container'>
                <div className='repo__label'>Описание:</div>
                <div className='repo__description_content'>{ repoData.description }</div>
            </div>
            <div className='repo__container'>
                <div className='repo__label'>Владелец:</div>
                <div className='repo__userInfo'>
                    <div className='repo__userInfo_pic'>
                        <img src={ repoData.owner && repoData.owner.avatar_url } alt='user pic' width={75}/>
                    </div>
                    <div className='repo__userInfo_links' >
                        <Link to={ `/${repoData.owner.login}` } className='repo__userInfo_infoPage'>
                            { repoData.owner && repoData.owner.login }
                        </Link>
                        <div className='repo__userInfo_hint'>Для просмотра информации о юзере кликните на его логин</div>
                        <div className='repo__userInfo_ghLink'>
                            (
                                <a href={ repoData.owner && repoData.owner.html_url } target='_blank'>
                                    GitHub пользователя
                                </a>
                            )
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : <div className='repo__noData'>Загрузка данных...</div>;
};
