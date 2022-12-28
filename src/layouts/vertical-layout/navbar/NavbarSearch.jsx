// ** React Imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postSearch } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../../@core/components/avatar";

// import { SearchRegular } from "@fluentui/react-icons";

// import UserDropdown from "../../components/Dropdowns/UserDropdown.js";
// import ProfilePicture from "../Image/ProfilePicture.js";
import { getUserData } from "../../../utils/storage";
import * as Icon from "react-feather";
import "./navbar.css";

const NavbarSearch = () => {
  const datauser = getUserData();
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [hasilSearch, setHasilSearch] = React.useState([]);
  const [keywordHistory, setKeywordHistory] = React.useState([]);

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
  const handleSetHistory = () => {
    var existingEntries = JSON.parse(localStorage.getItem("allEntries"));

    if (existingEntries == null) existingEntries = [];
    var entry = {
      keyword: keyword
    };
    localStorage.setItem("entry", JSON.stringify(entry));

    existingEntries.push(entry);
    localStorage.setItem("allEntries", JSON.stringify(existingEntries));
  };

  useEffect(() => {
    postSearchData();
  }, [keyword]);

  useEffect(() => {
    setKeywordHistory(JSON.parse(localStorage.getItem("allEntries")) || []);
  }, [1]);
  return (
    <div
      class="row height d-flex justify-content-center align-items-center"
      onClick={() => {
        setShowSearch(!showSearch);
      }}
    >
      <div class="col-md-6">
        <div class="form">
          <Icon.Search class="fa fa-search" />
          <input
            type="text"
            value={keyword}
            class="form-control form-input"
            placeholder="Search anything..."
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div class={`card searchbar ${showSearch ? "" : "display_search"} `}>
          <ul class="list-group list-group-flush">
            {hasilSearch.map((item, index) => (
              <li class="list-group-item d-flex">
                {" "}
                <Avatar
                  className="me-1"
                  img={item.avatar}
                  width="32"
                  height="32"
                />
                <span style={{marginTop: "4px", fontSize: "14px"}}>
                  {item.fullname} | {item.username} | {item.jabatan}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarSearch;
