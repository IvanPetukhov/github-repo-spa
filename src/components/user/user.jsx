import * as React from 'react';
import {Link} from "react-router-dom";
import './user.css';

export const User = ({userData, starredReposClicked, onLoadStarred, starredRepos }) => {
    console.log('userData', starredRepos);
    return userData ? (
        <div className='user'>
            <div className='user__card'>
                <div className='user__avatarContainer'>
                    <img src={ userData.avatar_url } alt='user pic' className='user__avatar'/>
                </div>
                <div className='user__userInfo'>
                    <div className='user__infoHeader'>
                        <div className='user__name'>
                            { `${ userData.name } (${ userData.login })` }
                        </div>
                        <div className='user__location'>
                            { userData.location }
                        </div>
                    </div>
                    <div className='user__stats'>
                        <div className='user__stats_elem'>
                            { `Подписчики: ${ userData.followers }` }
                        </div>
                        <div className='user__stats_elem'>
                            { `Подписки: ${ userData.following }` }
                        </div>
                        <div className='user__stats_elem'>
                            { `Публичные репозитории: ${ userData.public_repos }` }
                        </div>
                    </div>
                    <a href={ userData.html_url } target='_blank'>Страница на GitHub</a>
                </div>
            </div>
            <div className='user__starredRepos'>
                {
                    starredReposClicked && starredRepos ? Object.values(starredRepos).map((repo) => (
                        <div className='user__repoCard' key={ repo.fullName }>
                            <Link to={ `/${ repo.full_name }` } className='user__repoLink'>
                                { repo.full_name }
                            </Link>
                        </div>
                    )) : (
                        <button onClick={ onLoadStarred } className='user__loadStarredButton'>
                            Загрузить 100 репозиториев, отмеченных пользователем звездой
                        </button>
                    )
                }
            </div>
        </div>
    ) : <div>Загрузка данных...</div>;
};