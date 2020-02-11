import React from 'react';
import Form from '../components/form';
import { crowdfunding, campaign } from '../config';
import FileUpload from '../components/file-upload';

class CreateCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: '',
        description: '',
        fundingGoal: '',
        daysUntilExpiration: '',
      },
    };
  }

  handleChange = e => {
    const { formData } = this.state;
    const newData = { ...formData };
    const [field, value] = [e.target.name, e.target.value];
    newData[field] = value;
    this.setState({ formData: newData });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.startCampaign();
  };

  startCampaign = async () => {
    const { web3, account } = this.props;
    const { formData } = this.state;

    const crowdfundInstance = new web3.eth.Contract(
      crowdfunding.ABI,
      crowdfunding.ADDRESS,
    );

    crowdfundInstance.methods
      .startCampaign(
        formData.title,
        formData.description,
        formData.daysUntilExpiration,
        web3.utils.toWei(formData.fundingGoal, 'ether'),
      )
      .send({
        from: account,
      })
      .then(res => {
        console.log('this is the response object', res);
        const campaignInfo = res.events.CampaignCreated.returnValues; // event object
        campaignInfo.currentAmount = 0;
        campaignInfo.currentState = 0;
        campaignInfo.contract = new web3.eth.Contract(
          campaign.ABI,
          res.events.CampaignCreated.returnValues.contractAddress,
        );
      });
  };

  render() {
    const { formData } = this.state;
    const { account, web3, ipfs } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <Form
          data={formData}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <FileUpload account={account} web3={web3} ipfs={ipfs} />
      </div>
    );
  }
}

export default CreateCampaign;
