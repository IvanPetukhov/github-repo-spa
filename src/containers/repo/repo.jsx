import * as React from 'react';
import { Repo as RepoView } from '../../components/repo';
import { withRouter } from 'react-router';
import { loadSingleRepo } from '../../actions';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const {
        repo
    } = state;

    return { repo };
};

const RepoInner = (props) => {
    const { repoName, owner } = props.match.params;

    const fullName = React.useMemo(() => (`${ owner }/${ repoName }`), [repoName, owner]);

    React.useEffect(() => {
        props.loadSingleRepo(fullName);
    }, [props, fullName]);

     return (
        <RepoView repoData={ props.repo[fullName] } />
    );
};

export const Repo = withRouter(connect(
    mapStateToProps,
    {
        loadSingleRepo
    }
)(RepoInner));
