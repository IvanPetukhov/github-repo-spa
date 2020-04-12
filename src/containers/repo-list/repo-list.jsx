import * as React from 'react';
import { connect } from 'react-redux';
import { RepoList as RepoListView } from '../../components/repo-list';
import { loadRepos } from '../../actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
    const {
        repos
    } = state;

    return {
        repos: Object.values(repos)
    };
};

const RepoListInner = (props) => {
    React.useEffect(() => {
        props.loadRepos();
    }, []);

    return (
        <RepoListView repos={ props.repos }/>
    );
};

export const RepoList = withRouter(connect(
    mapStateToProps, {
        loadRepos,
    }
)(RepoListInner));
