import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

import AccountId from '../../../components/stellar/AccountId';

class AccountSwitcher extends React.Component {
  render() {
    const { openAccountId, accounts, keypair } = this.props;

    if (accounts.length === 0) {
      return null;
    }

    let currentId = 'null';

    const options = accounts.map(a => ({
      value: a.id,
      text: AccountId.getAccountIdText(a.keypair.publicKey()),
    }));

    if (keypair) {
      currentId = keypair.publicKey();
      options.push({
        value: 'null',
        text: 'Close account',
      });
    } else {
      options.unshift({
        value: 'null',
        text: 'No account selected',
      });
    }

    return (
      <Dropdown
        selection
        button
        color="blue"
        label="Select account"
        options={options}
        value={currentId}
        onChange={(e, d) => openAccountId(d.value)}
      />
    );
  }
}

AccountSwitcher.propTypes = {
  accounts: PropTypes.array.isRequired,
  keypair: PropTypes.object,
  openAccountId: PropTypes.func.isRequired,
};

export default AccountSwitcher;
