import { useState, useEffect } from 'react';
import axios from 'axios';
import loader from '../loader.gif';
import { useHistory, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import StudentModal from './StudentModal';

interface IStudents {
  _id: String;
  firstName: String;
  lastName: String;
  email: String;
  resume: String;
  imageUrl: String;
}

const StudentList = () => {
  const [students, setStudents] = useState<IStudents[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);

  const { offset } = useParams<{ offset: string }>();
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:3001/api/student/0').then((res: any) => {
      setStudents(res.data.items);
      setCount(res.data.count);
      setLoading(false);
    });
  }, []);

  const upload = (file: any) => {
    const formData = new FormData();
    formData.append('file', file[0]);
    axios.post('http://localhost:3001/api/file/new', formData).then(() => {
      axios.get('http://localhost:3001/api/student').then((res: any) => {
        setStudents(res.data);
      });
    });
  };

  const next = () => {
    if (parseInt(offset) + 8 >= count) return;
    setLoading(true);
    axios
      .get('http://localhost:3001/api/student/' + (parseInt(offset) + 8))
      .then((res: any) => {
        setStudents(res.data.items);
        setCount(res.data.count);
        history.replace('/admin/student/' + (parseInt(offset) + 8));
        setLoading(false);
      });
  };

  const prev = () => {
    if (!parseInt(offset)) return;
    setLoading(true);
    axios
      .get('http://localhost:3001/api/student/' + (parseInt(offset) - 8))
      .then((res: any) => {
        setStudents(res.data.items);
        setCount(res.data.count);
        history.replace('/admin/student/' + (parseInt(offset) - 8));
        setLoading(false);
      });
  };

  const customStyles = {
    content: {
      marginLeft: '33%',
      marginTop: '8%',
      border: '1px solid gray',
    },
  };

  if (loading) {
    return (
      <img
        style={{
          width: '150',
          marginLeft: ' auto',
          marginRight: 'auto',
          marginTop: '200px',
        }}
        src={loader}
        alt='loader'
      />
    );
  } else {
    return (
      <div>
        <nav className='bg-gray-800'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-8 w-8'
                    src='https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg'
                    alt='Workflow'
                  />
                </div>
                <div className='hidden md:block'>
                  <div className='ml-10 flex items-baseline space-x-4'>
                    <a className='bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'>
                      Student List
                    </a>
                    <a
                      className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                      href='/admin/company'
                    >
                      Company List
                    </a>
                  </div>
                </div>
              </div>
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  <button className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                    <span className='sr-only'>View notifications</span>
                    <svg
                      className='h-6 w-6'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                      />
                    </svg>
                  </button>

                  <div className='ml-3 relative'>
                    <div>
                      <button
                        type='button'
                        className='max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                        id='user-menu'
                        aria-expanded='false'
                        aria-haspopup='true'
                      >
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                          alt=''
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='-mr-2 flex md:hidden'>
                <button
                  type='button'
                  className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  aria-controls='mobile-menu'
                  aria-expanded='false'
                >
                  <span className='sr-only'>Open main menu</span>

                  <svg
                    className='block h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>

                  <svg
                    className='hidden h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className='md:hidden' id='mobile-menu'>
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              <a className='bg-gray-900 text-gray-300 block px-3 py-2 rounded-md text-base font-medium'>
                Student List
              </a>

              <a
                className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
                href='/admin/company'
              >
                Company List
              </a>
            </div>
            <div className='pt-4 pb-3 border-t border-gray-700'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    alt=''
                  />
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium leading-none text-white'>
                    Tom Cook
                  </div>
                  <div className='text-sm font-medium leading-none text-gray-400'>
                    tom@example.com
                  </div>
                </div>
                <button className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                  <span className='sr-only'>View notifications</span>
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                </button>
              </div>
              <div className='mt-3 px-2 space-y-1'>
                <a
                  href='#'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                >
                  Your Profile
                </a>

                <a
                  href='#'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                >
                  Settings
                </a>

                <a
                  href='#'
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </nav>

        <header className='bg-white shadow'>
          <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Student</h1>
          </div>
        </header>
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
            <button
              onClick={() => setModal(true)}
              className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Add
            </button>
            <Modal
              isOpen={modal}
              onRequestClose={() => setModal(false)}
              style={customStyles}
              className='w-4/12 md:min-w-1/2 rounded-md'
            >
              <button
                onClick={() => setModal(false)}
                style={{ float: 'right' }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
              <StudentModal setStudents={setStudents} setModal={setModal} />
            </Modal>
            <div className='px-4 py-6 sm:px-0'>
              <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Name
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Resume
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              Cohort
                            </th>
                            <th scope='col' className='relative px-6 py-3'>
                              <span className='sr-only'>Edit</span>
                            </th>
                          </tr>
                        </thead>
                        {students.map((ele: any, i: number) => (
                          <tbody
                            className='bg-white divide-y divide-gray-200 hover:bg-gray-100'
                            key={i}
                          >
                            <tr>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='flex items-center'>
                                  <div className='flex-shrink-0 h-10 w-10'>
                                    <img
                                      className='h-10 w-10 rounded-full'
                                      src={ele.imageUrl}
                                      alt=''
                                    />
                                  </div>
                                  <div className='ml-4'>
                                    <div className='text-sm font-medium text-gray-900'>
                                      {ele.firstName} {ele.lastName}
                                    </div>
                                    <div className='text-sm text-gray-500'>
                                      {ele.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <div className='text-sm text-gray-900'>
                                  <a className='hover:text-blue-500 cursor-pointer'>
                                    resume
                                  </a>
                                </div>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap'>
                                <span className='px-2 inline-flex text-xs leading-5 font-semibold'>
                                  Cohort 7
                                </span>
                              </td>

                              <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                <a
                                  href='#'
                                  className='text-indigo-600 hover:text-indigo-900'
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
                <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
                  <div className='flex-1 flex justify-between sm:hidden cursor-pointer'>
                    <a
                      onClick={prev}
                      className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer'
                    >
                      Previous
                    </a>
                    <a
                      onClick={next}
                      className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 cursor-pointer'
                    >
                      Next
                    </a>
                  </div>
                  <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                    <div>
                      <p className='text-sm text-gray-700'>
                        Showing
                        <span className='font-medium'> {students.length} </span>
                        out of
                        <span className='font-medium'> {count} </span>
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                        aria-label='Pagination'
                      >
                        <a
                          onClick={prev}
                          className='cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                        >
                          <span className='sr-only cursor-pointer'>
                            Previous
                          </span>
                          <svg
                            className='h-5 w-5'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              fillRule='evenodd'
                              d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </a>
                        {/* <a
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  1
                </a>
                <a
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  2
                </a>
                <a
                  href='#'
                  className='hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  3
                </a>
                <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                  ...
                </span>
                <a
                  href='#'
                  className='hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  8
                </a>
                <a
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  9
                </a>
                <a
                  href='#'
                  className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  10
                </a> */}
                        <a
                          onClick={next}
                          className='cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                        >
                          <span className='sr-only cursor-pointer'>Next</span>
                          <svg
                            className='h-5 w-5'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'
                          >
                            <path
                              fillRule='evenodd'
                              d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </a>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default StudentList;
