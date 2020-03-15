import React, { Component } from 'react';
import styles from './index.less';
import { DatePicker, List, Button } from 'antd-mobile';
import moment from 'moment';

class MyDatePicker extends Component {  // 名字冲突加了个My
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
    }
  }

  handleOk() {
    let { handleOk } = this.props;
    let { startDate, endDate } = this.state;
    let startDateFormat = moment(startDate).format('YYYY年MM月DD日');
    let endDateFormat = moment(endDate).format('YYYY年MM月DD日');
    let msg = startDateFormat + '到' + endDateFormat;
    // 传给父级
    handleOk(msg);
  }

  render() {
    let { startDate, endDate } = this.state;
    return (
      <div className={styles.datePickWrap}>
        <List>
          <DatePicker
            mode="date"
            value={startDate}
            onChange={date => this.setState({ startDate: date })}
          >
            <List.Item arrow="horizontal">起始日期</List.Item>
          </DatePicker>
          <DatePicker
            mode="date"
            minDate={startDate}
            value={endDate}
            onChange={date => this.setState({ endDate: date })}
          >
            <List.Item arrow="horizontal">截止日期</List.Item>
          </DatePicker>
          <List.Item>
            <Button
              size="small"
              type="primary"
              inline="true"
              disabled={!startDate || !endDate}
              className={styles.okBtn}
              onClick={() => this.handleOk()}
            >确认</Button>
            {/* <Button size="small" type="ghost" inline="true" style={{marginLeft: '0.2rem'}}>取消</Button> */}
          </List.Item>
        </List>
      </div>
    )
  }
}

export default MyDatePicker;
