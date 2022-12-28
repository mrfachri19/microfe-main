// ** React Imports
import { useEffect, useState, Fragment } from 'react'
// import { useParams } from "react-router-dom"

// ** Reactstrap Imports
import { 
  Row,
  Col,
  Container,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  dropdownOpen,
  toggleDropdown,
  Button,
  InputGroup,
  InputGroupText,
  Pagination, 
  PaginationItem, 
  PaginationLink
 } from 'reactstrap'

 import {
  SearchRegular,
  ChevronRightRegular 
} from "@fluentui/react-icons";

import SearchAction from "../../components/cards/searchAction";

import { useDispatch, useSelector } from "react-redux";
import { postSearch } from '@src/api';

import { searchKeyword } from '@store/global'
// import { Link, useNavigate,useLocation } from "react-router-dom";

const SearchKaryawan = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  // let history = useNavigate();
  // let location = useLocation()
  // let { keywords } = useParams();
  const { keywordSearch } = useSelector((state) => state.global);
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionName, setActionName] = useState('Karyawan')
  const [action, setAction] = useState(1)
  const [keyword, setKeyword] = useState(keywordSearch)
  const [perusahaan, setPerusahaan] = useState("")
  const [unit, setUnit] = useState("")
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [countData, setCountData] = useState(0);
  const [resultSearchData, setResultSearchData] = useState([]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const arrAction = [
    {
      'action' : 1,
      'action_name': 'Karyawan'
    },
    // {
    //   'action' : 2,
    //   'action_name': 'Komunitas'
    // },
    // {
    //   'action' : 3,
    //   'action_name': 'Post'
    // }
  ]

  function changByActiion(params) {
    setCountData(0)  
    setActionName(params.action_name)
    setAction(params.action)
    getSearchData(params.action,keywordSearch,perusahaan,unit,limit,0)
    setOffset(0)
  }
  
  function goSearch() {    
    setCountData(0)  
    getSearchData(action,keywordSearch,perusahaan,unit,limit,0)
    setOffset(0)
  }

  function setOffsetGetData(i){
    setOffset(i)
    getSearchData(action,keywordSearch,perusahaan,unit,limit,i)
  }

  function getSearchData(action=1,keywordSearch="",perusahaan="",unit="",limit=10,offset=0) {
    setLoading(true)
    return postSearch(
      {
        "action": action,
        "keyword": keywordSearch == "" ? "_" : keywordSearch,
        "perusahaan" : perusahaan,
        "divisi" : unit,
        "limit": limit,
        "offset": offset,
        "withcount": "true"
      }
    ).then((res) => {
      //  // console.log('rese',res);
      var tempList = [];
      tempList = res.data.data;
       // console.log("List data search => ", tempList);
      setLoading(false)
      setResultSearchData(tempList);
      setCountData(res.data.count)
    });
  }
  
  function changeKeyword(params) {
    dispatch(searchKeyword(params.target.value));
    // history('/home/search/'+params.target.value)
  }

  useEffect(() => {
    getKeyFromNavbar()
  });

  function getKeyFromNavbar() {
    let obj = document.getElementById('input-search-global')
    if (obj){
      obj.addEventListener('keyup', function (e) {
        dispatch(searchKeyword(e.target.value));
      })
    }
  }

  function renderDropdown() {
    return arrAction.map(item => {
      return (
        <DropdownItem key={item.action} tag='a' onClick={() => {changByActiion(item)}}>
          {item.action_name}
        </DropdownItem>
      )
    })
  }

  useEffect(() => {
    getSearchData(action,keywordSearch,perusahaan,unit,limit,offset);
  }, []);

  const renderPaging = (offset) => {
    let pagesArray = [];
    let n = (countData/limit)
    
    for (let i = 0; i < n; i++) {
      if (offset < 5) {
        if (i < 10) {
            pagesArray.push(<>
              <PaginationItem className={`${(i==offset) ? 'active' : ''}`} onClick={ e => { setOffsetGetData(i) }}>
                <PaginationLink href='#' onClick={e => e.preventDefault()}>
                {1+i}
                </PaginationLink>
            </PaginationItem>
          </>)          
        }
      }else if ((n - offset) < 5){
        if (i > (n-11)) {
          pagesArray.push(<>
            <PaginationItem className={`${(i==offset) ? 'active' : ''}`} onClick={ e => { setOffsetGetData(i) }}>
              <PaginationLink href='#' onClick={e => e.preventDefault()}>
              {1+i}
              </PaginationLink>
          </PaginationItem>
        </>) 
        }
      }else{
        if (i > (offset-5)) {
          if (i < (offset+5)) {
          pagesArray.push(<>
            <PaginationItem className={`${(i==offset) ? 'active' : ''}`} onClick={ e => { setOffsetGetData(i) }}>
              <PaginationLink href='#' onClick={e => e.preventDefault()}>
              {1+i}
              </PaginationLink>
          </PaginationItem>
        </>) 
          }
        }
      }
    }
    return pagesArray
  }

  return (
    <>
      <Fragment>
        <div>
          <Row>
            <div className='mt-2 mb-3'>
              <Row className='ps-4'>
                <Col xl="2" md="2" sm="12">
                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                    <DropdownToggle color='primary-600' className={loading == true ? "disabled" : ""} caret>
                      { actionName } 
                    </DropdownToggle>

                    <DropdownMenu>
                      {renderDropdown()}
                    </DropdownMenu>
                  </ButtonDropdown>
                </Col>

                <Col xl="2" md="4" sm="12">
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText>
                      <SearchRegular size={14} />
                    </InputGroupText>
                   <Input value={keywordSearch} className='keyword-search-page' placeholder={actionName == 'Komunitas' ? 'Nama Komunitas' : actionName == 'Post' ? 'Postingan' : 'Nama karyawan'} onChange={e => { changeKeyword(e)}} />
                  </InputGroup>
                </Col>
                <Col xl="2" md="4" sm="12"  hidden={actionName == 'Karyawan' ? false : true}>
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText>
                      <SearchRegular size={14} />
                    </InputGroupText>
                   <Input placeholder='Unit' value={unit} onChange={e => { setUnit(e.target.value) }} />
                  </InputGroup>
                </Col>
                <Col xl="2" md="4" sm="12" hidden={actionName == 'Karyawan' ? false : true}>
                  <InputGroup className='input-group-merge mb-2'>
                    <InputGroupText>
                      <SearchRegular size={14} />
                    </InputGroupText>
                   <Input placeholder='Perusahaan' value={perusahaan} onChange={e => { setPerusahaan(e.target.value) }} />
                  </InputGroup>
                </Col>
                
                <Col xxl="1" xl="1" md="1" sm="10">
                  <Button color='primary-600' className={loading == true ? "disabled" : ""} onClick={ goSearch }>Cari</Button>
                </Col>
              </Row>
            </div>
            <Row className='px-12'>
              <Col md='12'>
                <SearchAction 
                  listData={resultSearchData}
                  countData={countData}
                  action={action}
                  actionName={actionName}
                  loading={loading}
                />
              </Col>
              {countData > 0 ?
                <Col className='mt-7 d-flex' md='12'>
                  <Pagination className='d-flex disabled mx-auto'>
                    <PaginationItem className={`prev-item ${offset==0 ? 'disabled' : ''}`}>
                      <PaginationLink href='#' onClick={() => { setOffsetGetData(offset-1) }}></PaginationLink>
                    </PaginationItem>
                        {renderPaging(offset)}              
                    <PaginationItem className={`next-item ${(countData - (offset*limit)) <= limit ? 'disabled' : ''}`}>
                      <PaginationLink href='#' onClick={() => { setOffsetGetData(offset+1) }}></PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </Col>:
                <></>
              }
            </Row>
          </Row>
        </div>
      </Fragment>
    </>
  );
};

export default SearchKaryawan
