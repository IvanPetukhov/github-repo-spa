import * as React from 'react';
import { Repo as RepoView } from '../../components/repo';
import { withRouter } from 'react-router';
import { loadRepos } from '../../actions';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const {
        repos,
    } = state;

    return { repos };
};

export const RepoInner = (props) => {
    const { id } = props.match.params;

    /**
     * В полноценном проекте на страницу репозитория повесил бы отдельный запрос
     * Тут вытаскивал информацию из общего массива
     * Однако при завершении написания кода заметил, что при обновлении страницы ничего не подгружалось, так как
     * конкретно в текущем контейнере нет запроса.
     * Для ускорения написания кода перезапросил имеющимся запросом весь список (тут позволительно в силу небольшого запроса).
     **/
    React.useEffect(() => {
        if (Object.values(props.repos).length === 0) {
            props.loadRepos();
        }
    }, [props.repos]);

     return (
        <RepoView repoData={ props.repos[id] } />
    );
};

export const Repo = withRouter(connect(
    mapStateToProps,
    {
        loadRepos
    }
)(RepoInner));
