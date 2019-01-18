import React, { Component } from 'react'
import { Table, Tag, Button, Icon, Tooltip,Card,Modal,message} from 'antd';
import { postArticleList,postArticleTrDelete } from '../../../requests'
import moment from 'moment'
import XLSX from 'xlsx';
const ButtonGroup = Button.Group;
export default class ArticleList extends Component {

   columns = [{
    title: '书名',
    dataIndex: 'title',
    render:(text,record)=>{
      const dev=Number.parseInt(record.amount, 10) >= 500 ? <Tag color="red">{record.amount}</Tag>:<Tag color="green">{record.amount}</Tag>
      return (
        <div>
          {dev}
        <span>{text}</span>
        </div>
      )
  
    }
  },
  {
    title: '作者',
    dataIndex: 'author',
  },
  {
    title: '销量',
    dataIndex: 'amount',
    render: (text) => {
      return Number.parseInt(text, 10) >= 800 ? <Tag color="red">{text}</Tag> : <Tag color="green">{text}</Tag>
    }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    render: (text) => {
      return (
        moment(Number.parseInt(text, 10)).format('YYYY-MM-DD hh:mm:ss')
      )
  
    }
  },
  {
    title: '操作',
    dataIndex: 'actions',
    render: (text,record,index) => {
      return (
        <ButtonGroup size="small">
          <Tooltip placement="topLeft" title='编辑' onClick={this.goToEdit.bind(this,record.id)}>
            <Button type="primary">
              <Icon type="edit" />
            </Button>
          </Tooltip>
          <Tooltip placement="topLeft" title='删除'>
            <Button type="danger" onClick={this.handleDeleteTr.bind(this,record.title,record.id)}>
              <Icon type="delete" />
            </Button>
          </Tooltip>
        </ButtonGroup>
      )
    }
  },
  ];
  constructor() {
    super()
    this.state = {
      data: [],
      isloding: true
    }
  }
  componentDidMount() {

    this.loadListData();
  }
  goToEdit(id){
    this.props.history.push(`/admin/article/edit/${id}`)
  }

  loadListData(){
    this.setState({
      isloding:true
    })
    postArticleList().then(resp => {
      if (resp.data.res_code == 200) {
        this.setState({
          data: resp.data.res_body.data,
          isloding: false
        })
      }
    })
  }
  handleDeleteTr(title,id){
    console.log(title,id)
    Modal.confirm(
      {
        content:<div>确认删除<span style={{color:'red',padding:'5px'}}>{title}</span>吗?</div>,
        centered:true,
        maskClosable:true,
        okText:"确认删除吗",
        cancelText:"后悔了吧小子" ,
        onOk:()=>{
          this.handleDeleteEvent(id)
        }
      })  
  }
  handleDeleteEvent(id){
    this.setState({
      isloding:true
    })
    postArticleTrDelete().then(resp=>{
      if(resp.data.res_code===200)
      {
        message.success("删除成功",1);
        this.loadListData();
      }
    })
  }
  exportExcle(){
    //组合书籍导出列表
    console.log(this.columns);
    //定义一个数组存储title
    const title=this.columns.map(item=>item.title); 
    title.pop();
    console.log(title);
    //然后在吧书籍存储在数组里面
    console.log(this.state.data);
    const data=this.state.data.reduce((result,item)=>
    {
      const row=[item.title,item.author,item.amount,item.createTime];
      result.push(row);
      return result;
    },[])
    data.unshift(title)
    const ws = XLSX.utils.aoa_to_sheet(data);
			const wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
			/* generate file and send to client */
      XLSX.writeFile(wb, "list.xlsx");
      console.log(ws);
  }
  
  render() {
    return (
      <Card
      title="书籍列表"
      extra={ <Button type="primary" onClick={this.exportExcle.bind(this)}>导出Excle</Button>}
    >
    
    <Table loading={this.state.isloding}
        columns={this.columns}
        dataSource={this.state.data}
        pagination={{
          pageSize: 5,
          hideOnSinglePage: true,
          defaultCurrent: 1,
          showQuickJumper: true,
          showTotal: (total) => {
            return (
              <Tag color="blue">{total}</Tag>
            )
          },
          size: 'small'
        }}
        rowKey={(record) => {
          return record.title
        }}

      />
    </Card>

    )
  }
}
