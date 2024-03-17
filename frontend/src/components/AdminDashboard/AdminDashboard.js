import './AdminDashboard.scss'
import {useEffect, useState} from "react";
import {IoMdAdd} from "react-icons/io";
import {FiEdit3} from "react-icons/fi";
import {IoTrash} from "react-icons/io5";
import {deleteQuestion, getQuestions} from "../../apis/crud-question";
import Modal from 'react-modal';
import EditQuestion from "../EditQuestion/EditQuestion";
import {MdOutlineArrowForwardIos} from "react-icons/md";
import {MdOutlineArrowBackIosNew} from "react-icons/md";

export default function AdminDashboard(props) {

    const size = 10;

    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const refreshQuestions = (page, size) => {
        try {
            setLoading(true);
            console.log("refreshQuestions", page, size)
            getQuestions(page, size).then((response) => {
                console.log("response", response)
                if (response.error) {
                    console.error('Failed to fetch questions:', response.data);
                    setLoading(false);
                    return;
                }

                setQuestions(response.data.questions);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            });
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshQuestions(page, size);
    }, [page, size]);

    const handleFirstPage = () => {
        setPage(1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handleLastPage = () => {
        setPage(totalPages);
    };

    const [currentSelectId, setCurrentSelectId] = useState(-1);

    const goToEditQuestion = (id) => () => {
        // props.navigate(`/questions/edit/${id}`)
        openModal(id)
    }
    const callDeleteQuestion = (id) => () => {
        // show confirmation dialog
        if (!window.confirm('Are you sure you want to delete this question?')) {
            return;
        }
        console.log("callDeleteQuestion", id)
        deleteQuestion(id).then((response) => {
            if (response.error) {
                console.error('Failed to delete question:', response.data);
                return;
            }
            refreshQuestions(page, size);
        });
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const openModal = (id) => {
        setEditQuestionId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalStyles = {
        content: {
            top: '15%',
            left: '20%',
            right: '20%',

        },
    };


    return (
        <>
            <h1>Admin Dashboard</h1>
            <div className="container">
                <div className="section-1">
                    <h2>Question repository</h2>
                    <button className="add-button"
                            onClick={() => openModal(null)}
                    ><IoMdAdd className="add-icon"/>Add
                    </button>
                </div>

                <div className="section-2">
                    <table>
                        <tr>

                            <th>ID</th>
                            <th>Title</th>
                            <th>Categories</th>
                            <th>Difficulty</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {questions.map((question) => (
                            <>
                                <tr>
                                    <td className={'question-id'} onClick={() => {
                                        if (currentSelectId === question.id) {
                                            setCurrentSelectId(-1)
                                            return
                                        }
                                        setCurrentSelectId(question.id)
                                    }}>#{question.id}</td>
                                    <td className={'question-title'}
                                        onClick={() => {
                                            if (currentSelectId === question.id) {
                                                setCurrentSelectId(-1)
                                                return
                                            }
                                            setCurrentSelectId(question.id)
                                        }}
                                    >{question.title}</td>
                                    <td className={'question-category'}
                                        onClick={() => {
                                            if (currentSelectId === question.id) {
                                                setCurrentSelectId(-1)
                                                return
                                            }
                                            setCurrentSelectId(question.id)
                                        }}
                                    >{
                                        question.categories ? question.categories.join(', ') : ''}</td>
                                    <td className={'question-difficulty'}
                                        onClick={() => {
                                            if (currentSelectId === question.id) {
                                                setCurrentSelectId(-1)
                                                return
                                            }
                                            setCurrentSelectId(question.id)
                                        }}
                                    >{question.complexity}</td>
                                    <td className={'question-edit'} onClick={goToEditQuestion(question.id)}>
                                        <button ><FiEdit3/></button>
                                    </td>
                                    <td className={'question-delete'}>
                                        <button onClick={callDeleteQuestion(question.id)}>
                                            <IoTrash/>
                                        </button>
                                    </td>
                                </tr>
                                {currentSelectId === question.id && (
                                    <tr className={'question-description'}>
                                        <td colSpan={7}>
                                            <div className={'question-description-inner'}>
                                                <h4>Description:</h4>
                                                <ol>{question.description}</ol>
                                            </div>
                                            <div className={'question-example'}>
                                                <h4>Example:</h4>
                                                {question.testCase.map((testCase) => (
                                                    <div>
                                                        <ol>
                                                            Input: {testCase.input} <br></br>
                                                            Result: {testCase.result}

                                                        </ol>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )
                                }</>
                        ))}
                    </table>

                    <div className={'pagination'}>
                        {/*<button className={'support-btn'} onClick={handleFirstPage}><MdOutlineArrowBackIosNew /></button>*/}
                        <button className={'support-btn'} onClick={handlePrevPage}><MdOutlineArrowBackIosNew/></button>
                        {/*<button>{page}</button>*/}
                        {(page < 5 || totalPages <= 5) ?
                            Array.from({length: 5}, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    onClick={() => setPage(pageNumber)}
                                    className={pageNumber === page ? 'pagination-button-active' : 'pagination-button'}
                                >
                                    {pageNumber}
                                </button>
                            ))
                            :
                            <>
                                {page > 5 && <span>...</span>}
                                {Array.from({length: 5}, (_, i) => page - 4 + i)
                                    .filter(pageNumber => pageNumber >= 1 && pageNumber <= totalPages)
                                    .map(pageNumber => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => setPage(pageNumber)}
                                            className={pageNumber === page ? 'pagination-button-active' : 'pagination-button'}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))
                                }
                                {page < totalPages && <span>...</span>}
                            </>
                        }
                        <button className={'support-btn'} onClick={handleNextPage}><MdOutlineArrowForwardIos/></button>
                        {/*<button className={'support-btn'} onClick={handleLastPage}><MdOutlineArrowForwardIos /></button>*/}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Edit Question"
                style={modalStyles}
                // className={'modal'}
            >
                <EditQuestion id={editQuestionId} closeModal={closeModal}
                              refreshQuestions={() => refreshQuestions(page, size)}/>
            </Modal>
        </>
    )
}