import axios from "axios";

const HOST = 'http://localhost:3001';

export function createOrUpdateQuestion(question) {
    // Send a POST request to the server to create a new question
    // using axios

    // mock data
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data:
                    {
                        ...question,
                        id: question.id ? question.id : Math.floor(Math.random() * 1000) + 1,
                    }
                , error: false
            });
        }, 100);
    });


    // real data
    // if id is not present, create a new question by calling post
    // if id is present, update the question by calling put

    let method = 'post';
    let url = `${HOST}/api/questions`;
    if (question.id) {
        method = 'put';
        url = `${HOST}/api/questions/${question.id}`;
    }

    return axios({
        method,
        url,
        data: question,
    })
        .then((resp) => ({data: resp.data, error: false}))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}

export function deleteQuestion(id) {
    // Send a DELETE request to the server to delete a question
    // using axios

    // mock data
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: {}, error: false});
        }, 100);
    });

    // real data
    return axios
        .delete(`${HOST}/api/questions/${id}`)
        .then((resp) => ({data: resp.data, error: false}))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}

export function getQuestionById(id) {
    // Send a GET request to the server to get a question by id
    // using axios

    // mock data
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: {
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
                    "category": ["category1"],
                    "difficulty": "easy"
                }
                , error: false
            });
        }, 10);
    });

    // real data
    return axios
        .get(`${HOST}/api/questions/${id}`)
        .then((resp) => ({data: resp.data, error: false}))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}

export function getQuestions(page, size) {
    // Send a GET request to the server to get all questions
    // using axios

    // mock data
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data: {
                    "questions": [
                        {
                            "id": 1,
                            "title": "Add Two Numbers" + page,
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
                            "title": "Two Sum" + page,
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
                            "title": "Longest Substring Without Repeating Characters" + page ,
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
                    ],
                    "totalPages": 9,
                    "size": size,
                    "page": page
                }
                , error: false
            });
        }, 100);
    });

    // real data
    return axios
        .get(`${HOST}/api/questions`)
        .then((resp) => ({data: resp.data, error: false}))
        .catch((err) => ({
            data: err && err.response ? err.response.data : '',
            error: true,
            status: err && err.response ? err.response.status : '',
        }));
}