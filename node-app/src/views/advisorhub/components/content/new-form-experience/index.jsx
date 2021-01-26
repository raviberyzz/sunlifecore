const GlobalFilter = ({ setFilter }) => {
    function search() {
        var filterValue = $('.search').val();
        setFilter(filterValue);
    }
    function reset() {
        $('.search').val(''); 
            setFilter('');
    }
    return (
        <div className="searchContainer">
            <span className="globalSearch">
                <input
                    //  value={filter || ''}
                    placeholder="Search"
                    className="search"
                // onChange={e => setFilter(e.target.value)}
                />
                <button onClick={search} className="searchIcon"><i className="fa fa-search" ></i></button>
                <button onClick={reset}><i className="fa fa-repeat"></i></button>
            </span>
        </div>

    )
}
function Table({ columns, data, sortyBy, togglefilter, addFilterTxt, filtersData, addFilter, filterBtnTxt, selectedFilters, clearFilter, clearAll, clearAllTxt }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize },
        state
    } = ReactTable.useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 15 },
        },
        ReactTable.useGlobalFilter,
        ReactTable.usePagination
    )
    const { globalFilter } = state;
    function sort() {
        sortyBy();
    }
    return (
        <div className="tableContainer">
            
            <div className="filterSearchContainer">
                <div className="filter-container">
                <div className="counter">{((pageIndex + 1) * pageSize) - (pageSize - 1)} - {pageSize != page.length ? ((pageIndex + 1) * (pageSize)) - (pageSize - page.length) : (pageIndex + 1) * pageSize} of {data.length}</div>
                    <button class="toggle-filter filter-buttons addFilter" onClick={togglefilter}>{addFilterTxt}</button>
                    <form className="filters">
                        {Object.keys(filtersData).map((obj) => {
                            return <div className="filter"><input type="checkbox" name={filtersData[obj].id} value={filtersData[obj].title}></input><label for={filtersData[obj].title}>{filtersData[obj].title}</label></div>
                        })}
                        <button type="button" className="filterSubmit" onClick={addFilter}>{filterBtnTxt}</button>
                    </form>
                    {selectedFilters && <div className="selectedFilterContainer">{selectedFilters.map((value) => {
                        return <button className="selectedFilter filter-buttons" onClick={clearFilter}>{value}<i className="fa fa-times"></i></button>
                    })} {selectedFilters.length > 0 && <button className="filter-buttons" onClick={clearAll}>{clearAllTxt}</button>}</div>}
                </div>
                <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                    filteredData={data}
                />
            </div>
            <table className="new-form-table" {...getTableProps()}>
                <thead className="table-header">
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} id={index == 3 ? "sort" : ""} onClick={index == 3 ? sort : ""} className={index == 0 ? "col-sm-2" : (index == 2 ? "col-sm-2" : (index == 3 ? "col-sm-1" : ""))}>{column.render('Header')}
                                    {index == 3 ? <i className="fa fa-sort"></i> : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} className="new-form-tr">
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/*  Pagination Component*/}
            <div class="pagination-component">
                <nav role="navigation" aria-label="Pagination" class="text-center">
                    <ul className={`pagination pagination-list ${pageIndex + 1 < 2 ? 'first-page' : ''} ${pageIndex + 1 >= pageOptions.length ? 'last-page' : ''}`}>
                        {pageIndex + 1 != 1 && <li className={`previous ${(pageIndex + 1) < 2 ? 'disabled' : ''}`} onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <a className="page-link"><span class="fa fa-angle-left" aria-hidden="true"></span>
                                <span class="">Previous</span></a>
                        </li>}
                        {pageOptions.length > 1 && <li className={`link-to-first ${pageIndex + 1 == 1 ? 'active' : ''}`} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <a className="page-link">1</a>
                        </li>}
                        {pageIndex + 1 >= 5 && pageOptions.length > 6 &&
                            <li class="ellipsis"><a><span>&hellip;</span></a></li>
                        }
                        {pageOptions.map((page, index) => {
                            return (index > 1 && <li key={index} className={(pageIndex + 1 == index ? 'active' : index)}><a href="#news-wrapper-container" onClick={() => gotoPage(index - 1)}><span>{page}</span></a></li>)
                        })
                        }
                        {(pageOptions.length - pageIndex + 1) >= 4 && pageOptions.length > 6 &&
                            <li class="ellipsis"><a><span>&hellip;</span></a></li>
                        }
                        <li className={`lastPage ${pageIndex + 1 == pageOptions.length ? 'active' : ''}`}>
                            <a href="#news-wrapper-container" onClick={() => gotoPage(pageOptions.length - 1)}>
                                <span>{pageOptions.length}</span>
                            </a>
                        </li>
                        {pageIndex + 1 != pageOptions.length &&
                            <li className={`next ${pageIndex + 1 >= pageOptions.length ? 'disabled' : ''}`}>
                                <a href="#news-wrapper-container" onClick={() => gotoPage(pageIndex + 1)}>Next</a>
                            </li>
                        }

                    </ul>
                </nav>
            </div>
        </div>
    )
}

class NewFormExperience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            selectedFilters: [],
            originalData: [],
            filteredRows: [],
            filters: {},
            favorites: [],
            selectedValues:[],
            lang: utag_data.page_language,
            sorting: false

        };
        this.toggleFilter = this.toggleFilter.bind(this);
        this.addFilters = this.addFilters.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.sortColumn = this.sortColumn.bind(this);
    }

    componentDidMount() {
        /*  const tableData = [
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": ["Beneficiary", "Policy changes", "Client Service"]
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": ["Beneficiary", "Policy changes", "Client Service"]
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis Annuity products needs analysis",
                  "tags": ["Client Service", "Conversion", "Compliance", "Health Insurance", "Life insurance", "Products and Solutions", "Questionnaire", "Wealth", "Your business"]
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec Annuity products needs analysis Annuity products needs analysis",
                  "tags": ["Beneficiary", "Policy changes", "Client Service"]
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": ["Health Insurance", "Life insurance"]
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": ["Life insurance"]
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Policy changes", "Client Service", "Health Insurance", "Life insurance"]
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": ["Client Service"]
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": ["Health Insurance"]
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-10T21:14:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "55555",
                  "formInformation": "Sunlife Guranted Invested Funds -TFSA Application",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:14:00.000+05:30",
                  "eSign": "false",
                  "formNumber": "3333",
                  "formInformation": "New Account Application Form(NAAF)",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T21:18:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "4900-E",
                  "formInformation": "New Account Application Form(NAAF)-mutual fund account",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-13T21:12:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN11405",
                  "formInformation": "Annuity products needs analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-23T09:51:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              },
              {
                  "lastUpdated": "2021-01-14T20:57:00.000+05:30",
                  "eSign": "true",
                  "formNumber": "IN14050003",
                  "formInformation": "Anuity products need analysis",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:54:00.000-05:00",
                  "eSign": "true",
                  "formNumber": "111111",
                  "formInformation": "Identity verification, third party determination and politically exposed foreign persons",
                  "tags": []
              },
              {
                  "lastUpdated": "2020-12-24T09:52:00.000-05:00",
                  "eSign": "false",
                  "formNumber": "IN1405003*",
                  "formInformation": "Annuity products needs analysis for quebec",
                  "tags": []
              }
          ]*/

        const favoriteData = [{ "formNumber": "IN1405003*" }, { "formNumber": "4900-E" }];
        /* var originalresponseData = tableData
         // tableData = response;
         tableData.map((obj) => {
             favoriteData.map((favObj) => {
                 if (obj.formNumber == favObj.formNumber) {
                     obj.favorite = true;
                 }
             })
             if (!obj.favorite) obj.favorite = false;
         })
         tableData.sort((a, b) => {
             return b.favorite - a.favorite
         })
         this.setState({
             // data: tableData,
             data: tableData,
             originalData: originalresponseData,
             favorites: favoriteData
         }) */
        $.ajax({
            type: "GET",
            url: `${this.props.tableRowsDataUrl}.forms.${this.state.lang}.json`,
            dataType: "json",
            success: (response) => {
                var tableData = [];
                var originalresponseData = response
                tableData = response;
                tableData.map((obj) => {
                    favoriteData.map((favObj) => {
                        if (obj.formNumber == favObj.formNumber) {
                            obj.favorite = true;
                        }
                    })
                    if (!obj.favorite) obj.favorite = false;
                })
                tableData.sort((a, b) => {
                    return b.favorite - a.favorite
                })
                this.setState({
                    // data: tableData,
                    data: tableData,
                    originalData: originalresponseData,
                    favorites: favoriteData
                })
            },
            error: (err) => {
                console.log(err);
            }
        })


    }

    toggleFilter() {
        $('.filters').toggleClass('show-filters')
    }

    addFilters() {
        var filterData = [];
        var filteredRows = [];
        var selectedFiltersValues = [];
        $("input[type='checkbox']:checked").each(function () {
            filterData.push($(this).attr('name'));
            selectedFiltersValues.push($(this).attr('value'));
        })
        this.setState({
            selectedFilters: filterData,
            selectedValues:selectedFiltersValues
        })
        if (filterData.length > 0) {
            filteredRows = this.state.originalData.filter((row) => {
                return (row.tags && row.tags.some((val) => filterData.indexOf(val) > -1))
            })
            this.setState({
                data: filteredRows
            })
        }


        $('.filters').toggleClass('show-filters')
    }
    sortColumn() {
        var sortingData = this.state.data;
        console.log(sortingData);
        var eSignFavorite = sortingData.filter((row) => {
            if (row.eSign == "true" && row.favorite == true) {
                return row
            }
        })
        var eSignnotFav = sortingData.filter((row) => {
            if (row.eSign == "true" && row.favorite == false) {
                return row
            }
        })
        var noneSingFav = sortingData.filter((row) => {
            if (row.eSign == "false" && row.favorite == true) {
                return row
            }
        })
        var noneSingnotFav = sortingData.filter((row) => {
            if (row.eSign == "false" && row.favorite == false) {
                return row
            }
        })
        if (this.state.sorting) {
            var sortedData = [...noneSingFav, ...noneSingnotFav, ...eSignFavorite, ...eSignnotFav];
            var sorting = false
        } else {
            var sortedData = [...eSignFavorite, ...eSignnotFav, ...noneSingFav, ...noneSingnotFav];
            var sorting = true
        }

        this.setState({
            data: sortedData,
            sorting: sorting
        })
    }
    clearAll() {
        $('input[type="checkbox"]').each(function () {
            $(this).prop("checked", false);
        })
        this.setState({
            selectedValues: [],
            data: this.state.originalData
        })
    }

    clearFilter(event) {
        var deletFilter = event.currentTarget.textContent;
        var selFilters = this.state.selectedValues;
        var updatedFilterRows = [];
        selFilters.map((filter, i) => {
            if (filter == deletFilter) {
                $('input[type="checkbox"]').each(function () {
                    if ($(this).attr("value") == deletFilter) {
                        $(this).prop("checked", false);
                    }
                })
                selFilters.splice(i, 1);
            }
        })
        if (selFilters.length > 0) {
            updatedFilterRows = this.state.originalData.filter((row) => {
                return (row.tags && row.tags.some((val) => selFilters.indexOf(val) > -1))
            })
            this.setState({
                selectedFilters: selFilters,
                data: updatedFilterRows
            })
        } else if (selFilters.length < 1) {
            this.setState({
                data: this.state.originalData
            })
        }

    }
    render() {
        const columns = [
            {
                Header: 'New form experience table',
                columns: [
                    {
                        Header: `${this.props.tableHeaderCol1}`,
                        accessor: 'formNumber',
                    },
                    {
                        Header: `${this.props.tableHeaderCol2}`,
                        accessor: 'formInformation',
                    },
                    {
                        Header: `${this.props.tableHeaderCol3}`,
                        accessor: function lastUpdated(obj) {
                            var d = new Date(obj.lastUpdated),
                                month = '' + (d.getMonth() + 1),
                                day = '' + d.getDate(),
                                year = d.getFullYear();

                            if (month.length < 2)
                                month = '0' + month;
                            if (day.length < 2)
                                day = '0' + day;

                            return [year, month, day].join('/');
                        },
                    },
                    {
                        Header: `${this.props.tableHeaderCol4}`,
                        accessor: function eSign(obj) {
                            var check = obj.eSign;
                            if (check == "true") {
                                return <i class="fa fa-check"></i>
                            }
                        },

                    },
                    {
                        Header: `${this.props.tableHeaderCol5}`,
                        accessor: function favorite(obj) {
                            var fav = obj.favorite;
                            if (fav == true) {
                                return <i class="fa fa-star star-selected" ></i>
                            } else {
                                return <i class="fa fa-star star-not-selected" onclick='star()'></i>
                            }
                        }
                    },
                ],
            },
        ];

        // const filters = ["Beneficiary", "Policy changes", "Client Service", "Conversion", "Compliance", "Health Insurance", "Life insurance", "Products and Solutions", "Questionnaire", "Wealth", "Your business"];
        // const filters = { "wealth": { "id": "sunlife:advisorhub/wealth", "title": "Wealth", "tags": [] }, "your-business": { "id": "sunlife:advisorhub/your-business", "title": "Your business", "tags": [] }, "health-insurance": { "id": "sunlife:advisorhub/health-insurance", "title": "Health insurance", "tags": [] }, "products-and-solutions": { "id": "sunlife:advisorhub/products-and-solutions", "title": "Products and solutions", "tags": [] }, "title": "advisorhub", "questionnaires": { "id": "sunlife:advisorhub/questionnaires", "title": "Questionnaires", "tags": [] }, "beneficiary": { "id": "sunlife:advisorhub/beneficiary", "title": "Beneficiary", "tags": [] }, "compliance": { "id": "sunlife:advisorhub/compliance", "title": "Compliance", "tags": [] }, "conversion(s)": { "id": "sunlife:advisorhub/conversion(s)", "title": "Conversion(s)", "tags": [] }, "name": "advisorhub", "id": "sunlife:advisorhub", "life-insurance": { "id": "sunlife:advisorhub/life-insurance", "title": "Life insurance", "tags": [] }, "policy-changes": { "id": "sunlife:advisorhub/policy-changes", "title": "Policy changes", "tags": [] }, "client-service": { "id": "sunlife:advisorhub/client-service", "title": "Client Service", "tags": [] } };
        $.ajax({
            type: "GET",
            url: `${this.props.filtersDataUrl}.tags.${this.state.lang}.json`,
            dataType: "json",
            success: (response) => {
                this.setState({
                    filters: response
                })
            },
            error: (err) => {
                console.log(err);
            }
        })
        return (
            <React.Fragment>
                {/*<div className="filter-container">
                    <button class="toggle-filter filter-buttons col-sm-2 addFilter" onClick={this.toggleFilter}>{this.props.addFilterText}</button>
                    <form className="filters">
                        {Object.keys(this.state.filters).map((obj) => {
                            return <div className="filter"><input type="checkbox" name={this.state.filters[obj].id} value={this.state.filters[obj].title}></input><label for={this.state.filters[obj].title}>{this.state.filters[obj].title}</label></div>
                        })}
                        <button type="button" className="filterSubmit col-sm-12" onClick={this.addFilters}>{this.props.filterDoneText}</button>
                    </form>
                    {this.state.selectedFilters && <div className="col-xs-12 col-sm-6 selectedFilterContainer">{this.state.selectedFilters.map((value) => {
                        return <button className="selectedFilter filter-buttons" onClick={this.clearFilter}>{value}<i className="fa fa-times"></i></button>
                    })} {this.state.selectedFilters.length > 0 && <button className="filter-buttons" onClick={this.clearAll}>{this.props.ClearAllText}</button>}</div>}
                </div>*/}
                <Table columns={columns}
                    data={this.state.data}
                    sortyBy={this.sortColumn}
                    search={this.setFilteredData}
                    togglefilter={this.toggleFilter}
                    addFilterTxt={this.props.addFilterText}
                    filtersData={this.state.filters}
                    addFilter={this.addFilters}
                    filterBtnTxt={this.props.filterDoneText}
                    selectedFilters={this.state.selectedValues}
                    clearFilter={this.clearFilter}
                    clearAll={this.clearAll}
                    clearAllTxt={this.props.ClearAllText}
                ></Table>
            </React.Fragment>
        )
    }
}
reactComponents["new-form-experience"] = NewFormExperience;