// ** React Imports
import React, { useEffect, useState, Fragment } from "react";
import { postSearch } from "../../../../api";

// ** Third Party Components
import axios from "axios";
import classnames from "classnames";
import * as Icon from "react-feather";
import { AlertCircle } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { NavItem, NavLink, Badge } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';

// ** Store & Actions
import { useDispatch } from "react-redux";
import { handleSearchQuery } from "@store/navbar";

// ** Custom Components
import Avatar from "@components/avatar";

import {
  ChevronRightRegular
} from "@fluentui/react-icons";

import { searchKeyword } from '@store/global'

const NavbarSearch = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  let history = useNavigate();

  // ** States
  const [suggestions, setSuggestions] = useState([]);
  const [navbarSearch, setNavbarSearch] = useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [hasilSearch, setHasilSearch] = React.useState([]);

  // ** ComponentDidMount
  function postSearchData() {
    let data = {
      action: 1,
      keyword: keyword,
      limit: 5,
      offset: 0
    };
    postSearch(data).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Data search => ", tempList);
      setHasilSearch(tempList);
    });
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      postSearchData();
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [keyword]);

  // ** Removes query in store
  const handleClearQueryInStore = () => dispatch(handleSearchQuery(""));

  // ** Function to handle external Input click
  const handleExternalClick = () => {
    if (navbarSearch === true) {
      setNavbarSearch(false);
      handleClearQueryInStore();
    }
  };

  // ** Function to clear input value
  const handleClearInput = (setUserInput) => {
    if (!navbarSearch) {
      setUserInput("");
      handleClearQueryInStore();
    }
  };

  // ** Function to close search on ESC & ENTER Click
  const onKeyDown = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setTimeout(() => {
        setNavbarSearch(false);
        handleClearQueryInStore();
        setHasilSearch([]);
        dispatch(searchKeyword(keyword));
        history("/search")
      }, 1);
    }
  };

  // ** Function to handle search suggestion Click
  const handleSuggestionItemClick = () => {
    setNavbarSearch(false);
    handleClearQueryInStore();
  };

  // ** Function to handle search list Click
  const handleListItemClick = (func, link, e) => {
    func(link, e);
    setTimeout(() => {
      setNavbarSearch(false);
    }, 1);
    handleClearQueryInStore();
  };

  return (
    <NavItem className="nav-search" onClick={() => setNavbarSearch(true)}>
      <NavLink className="nav-link-search">
        <Icon.Search className="ficon" />
      </NavLink>
      <div
        className={classnames("search-input", {
          open: navbarSearch === true
        })}
      >
        <div className="search-input-icon">
          <Icon.Search />
        </div>
        {navbarSearch ? (
          <>
            <div className="autocomplete-container">
              <input
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => onKeyDown(e)}
                value={keyword}
                className={`autocomplete-search`}
                placeholder="Pencarian..."
              />
              <PerfectScrollbar className={classnames("suggestions-list")}>
                <Fragment className="suggestions-list">
                  {hasilSearch.length > 1 ? (
                    <>
                      {hasilSearch.map((item, index) => (
                        <Link key={`search-suggestion-${index}`} to={item.username != 'peduli_covid' ? `/profile/${item.username}` : '#'}>
                        <li className="suggestion-item suggestion-title-wrapper d-flex">
                          <Avatar
                            className="me-4"
                            img={item.avatar}
                            width="32"
                            height="32"
                          />
                          <h6
                            className="suggestion-title"
                            style={{ marginTop: "8px", fontSize: "14px" }}
                          >
                            {" "}
                            {item.fullname} | {item.username} | {item.jabatan}
                          </h6>
                        </li>
                        </Link>
                      ))}
                      <div className="d-flex">
                        <Link to={'search'} className="fw-bold mx-auto" onClick={()=>{ setHasilSearch([]), dispatch(searchKeyword(keyword)) }}>
                        <li className="suggestion-item suggestion-title-wrapper d-flex">
                          <Badge tag='div' color='light-primary' pill>
                            <span className="">Lihat Selengkapnya <ChevronRightRegular className="fs-6" height="100%" /></span>
                          </Badge>
                          </li>
                      </Link>
                    </div>
                    </>
                  ) : (
                    
                    <li className="suggestion-item no-result d-none">
                      <AlertCircle size={15} />{" "}
                      <span className="align-middle ms-50">No Result</span>
                    </li>
                  )}
                </Fragment>
              </PerfectScrollbar>
            </div>
          </>
        ) : null}
        <div className="search-input-close">
          <Icon.X
            className="ficon"
            onClick={(e) => {
              e.stopPropagation();
              setNavbarSearch(false);
              handleClearQueryInStore();
            }}
          />
        </div>
      </div>
    </NavItem>
  );
};

export default NavbarSearch;

