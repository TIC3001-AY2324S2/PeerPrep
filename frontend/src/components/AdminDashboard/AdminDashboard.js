import './AdminDashboard.scss'
import {useState} from "react";
import {Link} from 'react-router-dom';
import {IoMdAdd} from "react-icons/io";
import {FiEdit3} from "react-icons/fi";
import {MdCheckBoxOutlineBlank} from "react-icons/md";

export default function AdminDashboard(props) {


    const questions = [
        {
            "id": 1,
            "title": "Add Two Numbers",
            "description": "You are given two non-empty linked lists representing two non-negative integers. The" +
                " digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
            "testCases": [
                {
                    "input": [2, 4, 3],
                    "result": [5, 6, 4]
                },
                {
                    "input": [0],
                    "result": [0]
                },
            ],
            "category": ["linked list"],
            "difficulty": "medium"
        },

        {
            "id": 2,
            "title": "Two Sum",
            "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
            "testCases": [
                {
                    "input": [[2, 7, 11, 15], 9],
                    "result": [0, 1]
                },
                {
                    "input": [[3, 2, 4], 6],
                    "result": [1, 2]
                },
                {
                    "input": [[3, 3], 6],
                    "result": [0, 1]
                }
            ],
            "category": ["array"],
            "difficulty": "easy"
        },

        {
            "id": 3,
            "title": "Longest Substring Without Repeating Characters",
            "description": "Given a string s, find the length of the longest substring without repeating characters.",
            "testCases": [
                {
                    "input": "abcabcbb",
                    "result": 3
                },
                {
                    "input": "bbbbb",
                    "result": 1
                },

            ],
            "category": ["string"],
            "difficulty": "medium"
        },

        {
            "id": 4,
            "title": "Median of Two Sorted Arrays",
            "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
            "testCases": [
                {
                    "input": [[1, 3], [2]],
                    "result": 2.0
                },
                {
                    "input": [[0, 0], [0, 0]],
                    "result": 0.0
                },
                {
                    "input": [[], [1]],
                    "result": 1.0
                }
            ],
            "category": ["array"],
            "difficulty": "hard"
        },

        {
            "id": 5,
            "title": "Longest Palindromic Substring",
            "description": "Given a string s, return the longest palindromic substring in s.",
            "testCases": [
                {
                    "input": "babad",
                    "result": "bab"
                },
                {
                    "input": "cbbd",
                    "result": "bb"
                },
                {
                    "input": "a",
                    "result": "a"
                }
            ],
            "category": ["string"],
            "difficulty": "medium"
        }
    ]

    const [currentSelectId, setCurrentSelectId] = useState(-1);

    const goToEditQuestion = (id) => () => {
        props.navigate(`/questions/edit/${id}`)
    }
    const goToAddQuestion = () => {
        props.navigate(`/questions/add-new`)
    }

    return (
        <>
            <h1>Admin Dashboard</h1>
            <div className="container">
                <div className="section-1">
                    <h2>Question repository</h2>
                    <Link to="/questions/edit/new">
                        <button className="add-button"><IoMdAdd className="add-icon"/>Add</button>
                    </Link>
                </div>
                <div className="section-2">
                    <table>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th></th>
                        </tr>
                        {questions.map((question) => (
                            <>
                                <tr onClick={() => {
                                    // if the question is already selected, unselect it
                                    if (currentSelectId === question.id) {
                                        setCurrentSelectId(-1)
                                        return
                                    }
                                    // if the question is not selected, select it
                                    setCurrentSelectId(question.id)
                                }}>
                                    <td className={'question-select'}><MdCheckBoxOutlineBlank/></td>
                                    <td className={'question-id'}>#{question.id}</td>
                                    <td className={'question-title'}>{question.title}</td>
                                    <td className={'question-category'}>{question.category.join(', ')}</td>
                                    <td className={'question-difficulty'}>{question.difficulty}</td>
                                    <td className={'question-edit'}>
                                        <button onClick={goToEditQuestion(question.id)}><FiEdit3/></button>
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
                                                {question.testCases.map((testCase) => (

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
                </div>
            </div>
        </>
    )
}