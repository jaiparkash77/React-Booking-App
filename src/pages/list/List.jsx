import "./list.css"
import {Navbar} from "../../components/navbar/Navbar"
import {Header} from "../../components/header/Header"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { format } from "date-fns"
import { DateRange } from "react-date-range"
import SearchItem from "../../components/searchItem/SearchItem"

export const List = () => {
  const location = useLocation();
  // console.log(location);
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  const handleOption = (name, operation) =>{
    setOptions(pre=>{
      return {
        ...pre, [name] : operation === "i" ? options[name] + 1 : options[name] -1,
      }
    })
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" name="" id="" placeholder={destination} onChange={e=>setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in Date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/mm/yyyy")} to ${format(date[0].endDate, "dd/mm/yyyy")}`}</span>
              {openDate && <DateRange onChange={item=>setDate([item.selection])} minDate={new Date()} ranges={date} />}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min Price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max Price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  {/* <input type="number" min={1} className="lsOptionInput" placeholder={options.adult} /> */}
                  <div className="optionCounter">
                    <button className="optionCouterButton" disabled={options.adult <= 1} onClick={()=>handleOption("adult", "d")}>-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCouterButton" onClick={()=>handleOption("adult", "i")}>+</button>
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  {/* <input type="number" min={0} className="lsOptionInput" placeholder={options.children} /> */}
                  <div className="optionCounter">
                    <button className="optionCouterButton" disabled={options.children <= 0} onClick={()=>handleOption("children", "d")}>-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCouterButton" onClick={()=>handleOption("children", "i")}>+</button>
                  </div>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  {/* <input type="number" min={1} className="lsOptionInput" placeholder={options.room} /> */}
                  <div className="optionCounter">
                    <button className="optionCouterButton" disabled={options.room <= 1} onClick={()=>handleOption("room", "d")}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCouterButton" onClick={()=>handleOption("room", "i")}>+</button>
                  </div>
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  )
}
