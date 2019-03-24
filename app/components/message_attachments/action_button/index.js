// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {doPostAction} from 'mattermost-redux/actions/posts';
import {getTheme} from 'mattermost-redux/selectors/entities/preferences';
import {getCustomEmojisByName} from 'mattermost-redux/selectors/entities/emojis';

import {hasAnyEmojis} from 'app/utils/emoji_utils';
import {memoizeResult} from 'mattermost-redux/utils/helpers';

import ActionButton from './action_button';

function mapStateToProps(state, ownProps) {
    const memoizeHasAnyEmojis = memoizeResult((message, customEmojis) => hasAnyEmojis(message, customEmojis));
    return {
        theme: getTheme(state),
        hasAnyEmojis: memoizeHasAnyEmojis(ownProps.name, getCustomEmojisByName(state)),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            doPostAction,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
