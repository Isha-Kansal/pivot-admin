import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Search from '../../common/search';
import moment from 'moment';
import DELETE from '../../assets/icons/delete.svg';
import Tooltip from '../../common/toolTip';
import CommonModal from '../../common/commonModal';
import { NotificationManager } from 'react-notifications';
import { Table } from 'reactstrap';
import {
	CBadge,
	CButton,
	CCard,
	CCardBody,
	CCol,
	CRow,
	CFormGroup,
	CInput,
	CLabel,
} from '@coreui/react';
import Loader from '../../loader';
import { connect } from 'react-redux';
import CsvDownloader from 'react-csv-downloader';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import '../../../node_modules/react-datepicker/dist/react-datepicker.css';

// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCardHeader,
//   CCol,
//   CForm,
//   CFormGroup,
//   CTextarea,
//   CInput,
//   CLabel,
//   CRow,
// } from "@coreui/react";

import {
	fetchUsers,
	userStatus,
	deleteUser,
	fetchUsersCsv,
} from '../store/action';
import PaginationCommon from '../../common/pagination';
const offsetLimit = 10;
const Users = (props) => {
	const history = useHistory();

	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [type, setType] = useState('');
	const [offset, setOffset] = useState('');
	const [idUser, setIdUser] = useState('');
	const [usersDetails, setUsersDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const [count, setCount] = useState(0);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [country, setCountry] = useState('');

	const pageChange = async (newPage) => {
		setLoading(true);
		const diff = newPage - page;
		if (newPage === 1 || diff === 1) {
			props.fetchUsers(
				`user/all?offset=${
					newPage === 1 ? '' : offset
				}&limit=${offsetLimit}&search=${search}`,
				(value) => {
					const { users, count } = value.data;
					setLoading(false);
					setUsersDetails(users);
					setCount(count);
					setOffset(users.length && users[users.length - 1]._id);
					setPage(newPage);
				}
			);
		} else {
			let totalLimit = 0;
			if (diff > 1) {
				totalLimit = offsetLimit * (diff - 1);
			} else {
				totalLimit = offsetLimit * (newPage - 1);
			}
			const users = await new Promise((resolve) => {
				return props.fetchUsers(
					`user/all?offset=${
						diff > 0 ? offset : ''
					}&limit=${totalLimit}&search=${search}`,
					(value) => {
						const { users } = value.data;
						resolve(users);
					}
				);
			});
			if (users) {
				props.fetchUsers(
					`user/all?offset=${
						users[users.length - 1]._id
					}&limit=${offsetLimit}&search=${search}`,
					(value) => {
						const { users, count } = value.data;
						setLoading(false);
						setUsersDetails(users);
						setCount(count);
						setOffset(users.length && users[users.length - 1]._id);
						setPage(newPage);
					}
				);
			}
		}
	};
	const handleSearch = (e) => {
		setSearch(e.target.value);
		setPage(1);
		setOffset('');
	};

	useEffect(() => {
		callApiToFetchAllUsers();
	}, [search]);

	const callApiToFetchAllUsers = (isBlock) => {
		if (isBlock) {
			setLoading(true);

			props.fetchUsers(
				`user/all?offset=&limit=${offsetLimit}&search=${search}`,
				(value) => {
					const { users, count } = value.data;
					setLoading(false);
					setUsersDetails(users);
					setCount(count);
					setOffset(users.length && users[users.length - 1]._id);
				}
			);
		} else {
			setLoading(true);

			props.fetchUsers(
				`user/all?offset=${offset}&limit=${offsetLimit}&search=${search}`,
				(value) => {
					const { users, count } = value.data;
					setLoading(false);
					setUsersDetails(users);
					setCount(count);
					setOffset(users.length && users[users.length - 1]._id);
				}
			);
		}
	};

	const getBadge = (status) => {
		switch (status) {
			case 'Verified':
				return 'success';

			case 'Not Verified':
				return 'danger';
			default:
				return 'primary';
		}
	};

	const onBlock = (e, type, item) => {
		setIdUser(item._id);
		setType(type);
		e.preventDefault();
		e.stopPropagation();
		setModalOpen(!modalOpen);
	};
	const blockUser = (id) => {
		if (type === 'deleteUser') {
			if (idUser === id) {
				setModalOpen(false);
				setLoading(true);
				props.deleteUser(`user/delete?id=${id}`, (value) => {
					if (value.status === 200) {
						setLoading(false);
						NotificationManager.success('User deleted successfully', '', 1000);
						callApiToFetchAllUsers(true);
					}
				});
			}
		} else {
			if (idUser === id) {
				setModalOpen(false);

				callApi(type, id);
			}
		}
	};

	const onDelete = (e, type, id) => {
		setIdUser(id);
		setType(type);
		e.preventDefault();
		e.stopPropagation();
		setModalOpen(!modalOpen);
		setPage(1);
	};

	const callApi = (type, id) => {
		let obj = {
			type: type,
			id: id,
			user_type: 'user',
		};

		props.userStatus('common/change-status', obj, (value) => {
			if (value.status === 200) {
				NotificationManager.success(value.message, '', 1000);
				callApiToFetchAllUsers(true);
			}
		});
	};
	const onDownload = () => {
		props.fetchUsersCsv('user/download-csv', (value) => {
			var data = new Blob([value], { type: 'text/csv' });
			var csvURL = window.URL.createObjectURL(data);

			const tempLink = document.createElement('a');
			tempLink.href = csvURL;
			tempLink.setAttribute('download', 'users_list.csv');
			tempLink.click();
		});
	};

	const handleChangeFilter = (data, type) => {
		if (type === 'start') {
			setStartDate(data);
		} else if (type === 'end') {
			setEndDate(data);
		} else if (type === 'country') {
			setCountry(data);
		}
	};

	return (
		<>
		

			<CRow className="justify-content-between download-csv">
			
				<CCol lg={6} md={6} xs={12}>
					<form className="d-flex flex-sm-nowrap flex-wrap">
						<Search handleSearch={handleSearch} />
							<CButton block color="info" className="download-btn" onClick={(e) => onDownload(e)}>
								Download CSV file of Users
							</CButton>
					</form>
				
				</CCol>
				<CCol lg={6} md={6} xs={12}>
						<div className="d-flex justify-content-end  date-picker-outer">
						<div className="d-flex date-picker ">
							<div className="d-flex align-items-center mr-0 mr-xl-3">
								<CLabel>From</CLabel>
								<DatePicker
									selected={startDate}
									onSelect={(date) => handleChangeFilter(date, 'start')} //when day is clicked
									// onChange={handleDateChange} //only when value has changed
									dateFormat="dd/MM/yyyy"
									maxDate={new Date()}
								/>
							</div>
							<div className="d-flex align-items-center ">
								<CLabel>To</CLabel>
								<DatePicker
									selected={endDate}
									onSelect={(date) => handleChangeFilter(date, 'end')} //when day is clicked
									// onChange={handleDateChange} //only when value has changed
									dateFormat="dd/MM/yyyy"
									minDate={startDate}
									maxDate={new Date()}
								/>
							</div>
						</div>
					<div className="select-country">
						<div>
							<Select
								custom
								placeholder="Select country"
								name="country"
								id="country"
								onChange={(data) => handleChangeFilter(data, 'country')}
								// value={country ? { value: country, label: country } : null}
								value={country}
								// options={optionsGender}
							></Select>
						</div>
					</div>
				</div>
				</CCol>
				</CRow>
				<CRow>

				

				<CCol xl={12}>
					<CCard className="position-relative">
						{loading && <Loader />}

						<CCardBody>
							<Table
								responsive
								className={`table ${
									usersDetails.length === 0 ? 'tableHeight' : ''
								}`}
							>
								<thead>
									<tr>
										<th className="text-nowrap ">Name</th>

										<th>Email</th>
										<th>Status</th>

										<th>Country</th>
										<th>Created At</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{usersDetails && usersDetails.length === 0 && !loading && (
										<h3 className="text-center no-user-found">
											No Users Found!
										</h3>
									)}
									{usersDetails &&
										usersDetails.length > 0 &&
										usersDetails.map((item, index) => {
											let istDate = new Date(item.createdAt);

											let createdAt = moment(istDate).format(
												'DD-MM-YYYY, hh:mm a'
											);

											return (
												<tr
													style={{ cursor: 'pointer' }}
													onClick={() =>
														history.push({
															pathname: `/users/${item._id}`,
															state: usersDetails,
														})
													}
												>
													<td>
														{' '}
														{item.first_name && item.last_name
															? item.first_name + ' ' + item.last_name
															: '-'}
													</td>
													<td>{item.email ? item.email : '-'}</td>
													<td>
														<CBadge
															color={getBadge(
																!item.is_verified ? 'Not Verified' : 'Verified'
															)}
														>
															{!item.is_verified ? 'Not Verified' : 'Verified'}
														</CBadge>
													</td>
													<td>{item.country ? item.country : '-'}</td>
													<td>
														{createdAt !== 'Invalid date' ? createdAt : '-'}
													</td>
													<td>
														<div className="d-flex align-items-center">
															{item.user_status === 'blocked' ? (
																<CButton
																	onClick={(e) => onBlock(e, 'unblock', item)}
																	className="Unblock-btn block-btn"
																>
																	UnBlock
																</CButton>
															) : item.user_status === 'activated' ? (
																<div>
																	<CButton
																		onClick={(e) => onBlock(e, 'block', item)}
																		className="block-btn block-btn"
																	>
																		Block
																	</CButton>{' '}
																</div>
															) : item.user_status === 'deactivated' ? (
																<div>
																	<CButton
																		onClick={(e) => onBlock(e, 'block', item)}
																		className="block-btn block-btn"
																	>
																		Block
																	</CButton>
																</div>
															) : (
																<CButton
																	onClick={(e) => onBlock(e, 'block', item)}
																	className="block-btn block-btn"
																>
																	Block
																</CButton>
															)}

															<button
																className="icon"
																onClick={(e) =>
																	onDelete(e, 'deleteUser', item._id)
																}
																id={`delete-${index}`}
															>
																<img src={DELETE} className="ml-3" />
															</button>
															<Tooltip
																placement="top"
																target={`delete-${index}`}
															>
																Delete
															</Tooltip>
														</div>
													</td>
												</tr>
											);
										})}
								</tbody>
							</Table>

							<PaginationCommon
								pageChange={pageChange}
								count={count}
								offsetLimit={offsetLimit}
								page={page}
								loading={loading}
							/>
							<div>
								{modalOpen && (
									<CommonModal
										isOpen={modalOpen}
										toggle={(e) => onBlock(e, type, idUser)}
										block_delete={(e) => blockUser(e, idUser)}
										id={idUser}
										type={type}
									/>
								)}
							</div>
						</CCardBody>
					</CCard>
				</CCol>
			</CRow>
		</>
	);
};

const mapStateToProps = (state) => {
	return {};
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(
		{
			fetchUsers,
			deleteUser,
			userStatus,
			fetchUsersCsv,
		},
		dispatch
	);
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
