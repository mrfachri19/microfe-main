// ** React Imports
import React, { useEffect, useState, Fragment, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFWA, getTimeManagementV2 } from "../../../api";
import { getUsernik } from "../../../utils/storage";
import { mobileVersion, mobileVersion2 } from "../../../store";
import moment from "moment";
import {
  categoryRequest,
  selectPermohonanId
} from "./store";
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Blank Avatar Image
import blankAvatar from "@src/assets/images/avatars/avatar-blank.png";

// ** Third Party Components
import classnames from "classnames";
import { ReactSortable } from "react-sortablejs";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Menu, Search, MoreVertical, ChevronDown } from "react-feather";

// ** Store & Actions

// ** Third Party Components
import ReactPaginate from 'react-paginate'

// ** Reactstrap Imports
import {
  Input,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  Card,
  CardHeader,
  CardTitle,
  Label,
  Row,
  Col,
  Table,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from "reactstrap";
import HalamanKosong from "@components/content/halamanKosong";

const Request = (props) => {
  // ** Props
  const {
    query,
    tasks,
    params,
    setSort,
    dispatch,
    getTasks,
    setQuery,
    updateTask,
    selectTask,
    reOrderTasks,
    getData,
    handleTaskSidebar,
    handleMainSidebar
  } = props;

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
  };
  const navigate = useNavigate()
  // task list
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [limit, setLimit] = useState(20);
  const [listDataTask, setListDataTask] = useState([]);
  const datauser = getUsernik();

  // ** Store Vars
  // const store = useSelector(state => state.todo)
  const category = useSelector((state) => state.request.category.category);
  const selectedPermohonanId = useSelector((state) => state.request.selectedPermohonanId.selectedPermohonanId);

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageCuti, setCurrentPageCuti] = useState(1)
  const [currentPageSppd, setCurrentPageSppd] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchValue, setSearchValue] = useState('')
  const [totals, setTotals] = React.useState(0);
  const [totalsCuti, setTotalsCuti] = React.useState(0);
  const [totalsSppd, setTotalsSppd] = React.useState(0);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [listPermohonan, setListPermohonan] = useState([])
  const [listPermohonanCuti, setListPermohonanCuti] = useState([])
  const [listPermohonanSppd, setListPermohonanSppd] = useState([])

  const [open, setOpen] = useState('')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }

  function getPermohonanData() {
    getFWA(`flexi/place?status=${category ? category : "dashboard_web"}&jenis=fwa&limit=5&offset=${currentPage - 1}`).then((res) => {
      var tempList = [];
      tempList = res.data;
      //  // console.log("List Data Permohonan ", tempList);
      setListPermohonan(tempList.data)
      setTotals(tempList.total)
    });
  }

  function getListCutiData() {
    getFWA(`flexi/place?status=${category ? category : "dashboard_web"}&jenis=cuti&limit=5&offset=${currentPageCuti - 1}`).then((res) => {
      var tempList = [];
      tempList = res.data;
      //  // console.log("List Data Permohonan Cuti ", tempList);
      setListPermohonanCuti(tempList.data)
      setTotalsCuti(tempList.total)
    });
  }

  function getListSppdData() {
    getFWA(`flexi/place?status=${category ? category : "dashboard_web"}&jenis=sppd&limit=5&offset=${currentPageSppd - 1}`).then((res) => {
      var tempList = [];
      tempList = res.data;
      //  // console.log("List Data Permohonan ", tempList);
      setListPermohonanSppd(tempList.data)
      setTotalsSppd(tempList.total)
    });
  }

  useEffect(() => {
    dispatch({
      type: "set",
      isImageModal: false,
      isPernyataanFwaModal: false,
      isValidationModal: false,
      isValidationModalYes: false,
      isPostApproved: false,
    });
    dispatch(categoryRequest({ category: "dashboard_web" }));
    getPermohonanData()
    getListCutiData()
    getListSppdData()
  }, [1])

  useEffect(() => {
    getPermohonanData()
    getListCutiData()
    getListSppdData()
    // setPageNumber(1)
    setCurrentPage(1)
    setCurrentPageCuti(1)
    setCurrentPageSppd(1)
  }, [category])

  useEffect(() => {
    getPermohonanData()
  }, [currentPage])

  useEffect(() => {
    getListCutiData()
  }, [currentPageCuti])

  useEffect(() => {
    getListSppdData()
  }, [currentPageSppd])

  function truncate(input, val) {
    if (input.length > val) {
      return input.substring(0, val) + "...";
    }
    return input;
  }

  // ** Function to handle filter
  const handleFilter = e => {
    setSearchValue(e.target.value)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        q: e.target.value
      })
    )
  }

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }
  const handlePaginationCuti = page => {
    setCurrentPageCuti(page.selected + 1)
  }
  const handlePaginationSppd = page => {
    setCurrentPageSppd(page.selected + 1)
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(totals / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName={
          'pagination react-paginate separated-pagination justify-content-center mt-5'
        }
      />
    )
  }
  const CutiPagination = () => {
    const count = Math.ceil(totalsCuti / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPageCuti !== 0 ? currentPageCuti - 1 : 0}
        onPageChange={page => handlePaginationCuti(page)}
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName={
          'pagination react-paginate separated-pagination justify-content-center mt-5'
        }
      />
    )
  }
  const SppdPagination = () => {
    const count = Math.ceil(totalsSppd / rowsPerPage)

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={currentPageSppd !== 0 ? currentPageSppd - 1 : 0}
        onPageChange={page => handlePaginationSppd(page)}
        pageClassName='page-item'
        breakClassName='page-item'
        nextLinkClassName='page-link'
        pageLinkClassName='page-link'
        breakLinkClassName='page-link'
        previousLinkClassName='page-link'
        nextClassName='page-item next-item'
        previousClassName='page-item prev-item'
        containerClassName={
          'pagination react-paginate separated-pagination justify-content-center mt-5'
        }
      />
    )
  }
  const renderTasks = () => {
    return (
      <div
        className="list-group todo-task-list-wrapper"
        options={{ wheelPropagation: false }}
      >
        {TableBasic()}
        {CustomPagination()}
      </div>
    );
  };
  const renderCuti = () => {
    return (
      <div
        className="list-group todo-task-list-wrapper"
        options={{ wheelPropagation: false }}
      >
        {TableListCuti()}
        {CutiPagination()}
      </div>
    );
  };
  const renderSppd = () => {
    return (
      <div
        className="list-group todo-task-list-wrapper"
        options={{ wheelPropagation: false }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return { ...original, height: Math.floor(original.height) };
            };
          }
        }}
      >
        {TableListSppd()}
        {SppdPagination()}
      </div>
    );
  };

  const TableBasic = () => {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Pemohon</th>
            <th>Jenis Permohonan</th>
            <th>Keterangan</th>
            <th>Tanggal Dibuat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listPermohonan.map((item, index) => (
            <tr key={index}
              onClick={() => { dispatch(selectPermohonanId({ selectedPermohonanId: item.id })), navigate(`/app/request/fwa/${item.id}`) }}>
              <td style={{ maxWidth: "325px", minWidth: "325px" }}>
                <div className='d-flex'>
                  <div className={`bg-white`}
                    style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                    <Avatar
                      className="photo-karyawan"
                      img={item.photo}
                      imgHeight="40"
                      imgWidth="40"
                    />
                  </div>
                  <div className='my-auto ms-1'>
                    <div className='mb-0 fs-4'>
                      {truncate(item.name, 25)}
                    </div>
                    <small>{truncate(item.posisi, 30)}</small>
                  </div>
                </div>
              </td>
              <td style={{ minWidth: "80px" }}>{item.tipe_permohonan}</td>
              <td style={{ minWidth: "100px" }}>
                {item.keterangan}
              </td>
              <td style={{ minWidth: "100px" }}>
                {moment(item.created_date).format("DD MMMM YYYY")}
              </td>
              <td style={{ minWidth: "80px" }}>
                <Badge tag='div'
                  color={`${item.status_warna === "#D69E2E"
                    ? "light-warning" : item.status_warna === "#38A169"
                      ? "light-primary" : item.status_warna === "#DD6B20"
                        ? "light-danger" : "light-tertiary"}`} pill>
                  {item.status_text}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    );
  };
  const TableListCuti = () => {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Pemohon</th>
            <th>Jenis Permohonan</th>
            <th>Keterangan</th>
            <th>Tanggal Dibuat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listPermohonanCuti.map((item, index) => (
            <tr key={index}
              onClick={() => { dispatch(selectPermohonanId({ selectedPermohonanId: item.id })), navigate(`/app/request/cuti/${item.id}`) }}>
              <td style={{ maxWidth: "325px", minWidth: "325px" }}>
                <div className='d-flex'>
                  <div className={`bg-white`}
                    style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                    <Avatar
                      className="photo-karyawan"
                      img={item.photo}
                      imgHeight="40"
                      imgWidth="40"
                    />
                  </div>
                  <div className='my-auto ms-1'>
                    <div className='mb-0 fs-4'>
                      {truncate(item.name, 25)}
                    </div>
                    <small>{truncate(item.posisi, 30)}</small>
                  </div>
                </div>
              </td>
              <td style={{ minWidth: "80px" }}>{item.tipe_permohonan}</td>
              <td style={{ minWidth: "100px" }}>
                {item.keterangan}
              </td>
              <td style={{ minWidth: "100px" }}>
                {moment(item.created_date).format("DD MMMM YYYY")}
              </td>
              <td style={{ minWidth: "80px" }}>
                <Badge tag='div'
                  color={`${item.status_warna === "#D69E2E"
                    ? "light-warning" : item.status_warna === "#38A169"
                      ? "light-primary" : item.status_warna === "#DD6B20"
                        ? "light-danger" : "light-tertiary"}`} pill>
                  {item.status_text}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    );
  };

  const TableListSppd = () => {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Pemohon</th>
            <th>Jenis Permohonan</th>
            <th>Keterangan</th>
            <th>Tanggal Dibuat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {listPermohonanSppd.map((item, index) => (
            <tr key={index}
              onClick={() => { localStorage.setItem("checkTab", category), dispatch(selectPermohonanId({ selectedPermohonanId: item.id })), navigate(`/app/request/sppd/${item.id}`) }}>
              <td style={{ maxWidth: "325px", minWidth: "325px" }}>
                <div className='d-flex'>
                  <div className={`bg-white`}
                    style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                    <Avatar
                      className="photo-karyawan"
                      img={item.photo}
                      imgHeight="40"
                      imgWidth="40"
                    />
                  </div>
                  <div className='my-auto ms-1'>
                    <div className='mb-0 fs-4'>
                      {truncate(item.name, 25)}
                    </div>
                    <small>{truncate(item.posisi, 30)}</small>
                  </div>
                </div>
              </td>
              <td style={{ minWidth: "80px" }}>{item.tipe_permohonan}</td>
              <td style={{ minWidth: "100px" }}>
                {item.keterangan}
              </td>
              <td style={{ minWidth: "100px" }}>
                {moment(item.created_date).format("DD MMMM YYYY")}
              </td>
              <td style={{ minWidth: "80px" }}>
                <Badge tag='div'
                  color={`${item.status_warna === "#D69E2E"
                    ? "light-warning" : item.status_warna === "#38A169"
                      ? "light-primary" : item.status_warna === "#DD6B20"
                        ? "light-danger" : "light-tertiary"}`} pill>
                  {item.status_text}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    );
  };

  // ** Get data on mount
  // useEffect(() => {
  //    // console.log("text redux selectedPermohonanId", selectedPermohonanId);
  // }, [selectedPermohonanId])


  return (
    <div className="todo-app-list" style={{ backgroundColor: "white" }}>
      <div className="app-fixed-search d-flex align-items-center">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div className="d-flex align-content-center justify-content-between w-100">
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input
              placeholder="Search"
              value={query}
              onChange={handleFilter}
            />
          </InputGroup>
        </div>
      </div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId='1'>Flexible Working Arrangement (<span className="text-secondary-500">{totals}</span>)</AccordionHeader>
          <AccordionBody accordionId='1'>
            {listPermohonan.length ?
              <>{renderTasks()}</> :
              <HalamanKosong text={category === "dashboard_web" ? "Belum Ada Pengajuan di proses" : category === "notification_web" ? "Kamu belum mendapatkan notifikasi" : "Belum Ada Pengajuan untuk di setujui"} />
            }
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId='2'>Cuti (<span className="text-secondary-500">{totalsCuti}</span>)</AccordionHeader>
          <AccordionBody accordionId='2'>
            {listPermohonanCuti.length ?
              <>{renderCuti()}</> :
              <HalamanKosong text={category === "dashboard_web" ? "Belum Ada Pengajuan di proses" : category === "notification_web" ? "Kamu belum mendapatkan notifikasi" : "Belum Ada Pengajuan untuk di setujui"} />
            }
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId='3'>Surat Perintah Perjalanan Dinas (<span className="text-secondary-500">{totalsSppd}</span>)</AccordionHeader>
          <AccordionBody accordionId='3'>
            {listPermohonanSppd.length ?
              <>{renderSppd()}</> :
              <HalamanKosong text={category === "dashboard_web" ? "Belum Ada Pengajuan di proses" : category === "notification_web" ? "Kamu belum mendapatkan notifikasi" : "Belum Ada Pengajuan untuk di setujui"} />
            }
          </AccordionBody>
        </AccordionItem>
        {/* <AccordionItem>
          <AccordionHeader targetId='4'>Manfaat Program Pensiun</AccordionHeader>
          <AccordionBody accordionId='4'>
            <HalamanKosong text={category === "dashboard_web" ? "Belum Ada Pengajuan di proses" : category === "notification_web" ? "Kamu belum mendapatkan notifikasi" : "Belum Ada Pengajuan untuk di setujui"} />
          </AccordionBody>
        </AccordionItem> */}
      </Accordion>
    </div>
  );
};

export default Request;
