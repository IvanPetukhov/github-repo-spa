import * as React from 'react';
import { Link } from 'react-router-dom';
import './repo-list.css';

export const RepoList = ({ repos }) => {
    return (
        <table className='repoList__table'>
            <thead>
                <tr className='repoList__headerRow'>
                    <th className='repoList__cell'>№</th>
                    <th className='repoList__cell'>Название</th>
                    <th className='repoList__cell'>Владелец</th>
                    <th className='repoList__cell'>Ссылка на github</th>
                </tr>
            </thead>
            <tbody>
                { Object.values(repos).map((item, i) => {
                    return (
                        <tr key={ i } className='repoList__row'>
                            <td className='repoList__cell'>
                                <Link to={`/${item.id}`} className='repoList__link' >
                                    { i + 1 }
                                </Link>
                            </td>
                            <td className='repoList__cell'>
                                <Link to={`/${item.id}`} className='repoList__link' >
                                    { item.name }
                                </Link>
                            </td>
                            <td className='repoList__cell'>
                                <Link to={`/${item.id}`} className='repoList__link' >
                                    { item.owner && item.owner.login }
                                </Link>
                            </td>
                            <td className='repoList__cell'>
                                <a href={ item.url } target='_blank'>
                                    Ссылка
                                </a>
                            </td>
                        </tr>
                    );
                }) }
            </tbody>
        </table>
    );
}