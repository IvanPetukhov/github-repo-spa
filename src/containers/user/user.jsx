import * as React from 'react';
import { User as UserView } from '../../components/user';
import { withRouter } from 'react-router';
import { loadUser, loadStarredRepos } from '../../actions';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const {
        user,
        starredRepos
    } = state;

    return { user, starredRepos };
};

const RepoInner = (props) => {
    const { login } = props.match.params;
    const [ starredReposClicked, setStarredReposClicked ] = React.useState(false);

    React.useEffect(() => {
        props.loadUser(login);
    }, [props]);

    const onLoadStarred = () => {
        setStarredReposClicked(true);
        props.loadStarredRepos(login);
    };

    console.log(props);

    return (
        <UserView
            userData={ props.user[login] }
            starredReposClicked={ starredReposClicked }
            onLoadStarred={ onLoadStarred }
            starredRepos={ props.starredRepos }
        />
    );
};

export const User = withRouter(connect(
    mapStateToProps,
    {
        loadUser,
        loadStarredRepos
    }
)(RepoInner));
