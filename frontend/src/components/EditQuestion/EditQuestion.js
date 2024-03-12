import './EditQuestion.scss'
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import {IoIosArrowDown} from "react-icons/io";

export default function EditQuestion(props) {


    const {id: pathId} = useParams();
    const [id, setId] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [testCases, setTestCases] = useState([{input: '', result: ''}]);
    const [category, setCategory] = useState([]);
    const [difficulty, setDifficulty] = useState('');

    const handleAddTestCase = () => {
        setTestCases([...testCases, {input: '', result: ''}]);
    };
    const handleRemoveTestCase = (index) => {
        const newTestCases = [...testCases];
        newTestCases.splice(index, 1);
        setTestCases(newTestCases);
    };

    const handleTestCaseChange = (index, field, value) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };

    const handleCategoryChange = (event) => {
        setCategory(Array.from(event.target.selectedOptions, option => option.value));
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const mockFetchQuestion = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: '1',
                    title: 'Mock Title',
                    description: 'Mock Description',
                    testCases: [{input: 'Mock Input', result: 'Mock Result'}],
                    category: ['Mock Category'],
                    difficulty: 'easy',
                });
            }, 1000);
        });
    };

    useEffect(() => {
        if (pathId !== 'new') {
            // fetch(`https://example.com/api/questions/${pathId}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         setId(data.id);
            //         setTitle(data.title);
            //         setDescription(data.description);
            //         setTestCases(data.testCases);
            //         setCategory(data.category);
            //         setDifficulty(data.difficulty);
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     });
            mockFetchQuestion()
                .then(data => {
                    setId(data.id);
                    setTitle(data.title);
                    setDescription(data.description);
                    setTestCases(data.testCases);
                    setCategory(data.category);
                    setDifficulty(data.difficulty);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            setId(null);
        }
    }, [pathId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description || !testCases.length || !category.length || !difficulty) {
            alert('All fields are required');
            return;
        }

        // Serialize state to JSON
        const data = JSON.stringify({
            id,
            title,
            description,
            testCases,
            category,
            difficulty
        });

        // Send a POST request
        fetch('https://example.com/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(-1);
    };

    const handleDelete = () => {

        fetch(`https://example.com/api/questions/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // After successfully deleting the question, redirect the user back to the previous page
                navigate(-1);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={'form-container'}>

            <form onSubmit={handleSubmit}>
                <h1>{id !== null ? 'Edit Question' : 'Add New Question'}</h1>
                <label>Question Title * </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label>Question Description * </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>

                {/* handle test cases, category and difficulty inputs similarly */}
                {testCases.map((testCase, index) => (

                    <div key={index} className={'form-section-testcase-1'}>
                        <div className={'form-section-1'}>
                            <div className={'test-case'}>
                                <label>Test Case</label>
                                <textarea value={testCase.input}
                                          onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}/>
                            </div>
                            <div className={'test-result'}>
                                <label>Test Result</label>
                                <textarea value={testCase.result}
                                          onChange={(e) => handleTestCaseChange(index, 'result', e.target.value)}/>
                            </div>
                        </div>

                        <button className={'remove-testcase'} type={'button'}
                                onClick={() => handleRemoveTestCase(index)}>Remove
                        </button>

                    </div>
                ))}

                <div className={'form-section-testcase-2'}>
                    <button className={'add-testcase'} type={'button'} onClick={handleAddTestCase}>Add Test Case
                    </button>
                </div>
                <div className={'form-section-2'}>

                    <div className={'form-category'}>
                        <label>Category * </label>
                        <select value={category} onChange={handleCategoryChange}>
                            {/* replace with actual categories */}
                            <option value={'category1'}>Category 1</option>
                            <option value={'category2'}>Category 2</option>
                            <option value={'category3'}>Category 3</option>
                        </select>
                    </div>
                    <div className={'form-difficulty'}>
                        <label>Difficulty * </label>
                        <select>
                            <option
                                value={'easy'} selected onChange={handleDifficultyChange}>
                                Easy
                            </option>
                            <option value={'medium'} onChange={handleDifficultyChange}>
                                Medium
                            </option>
                            <option value={'hard'} onChange={handleDifficultyChange}>
                                Hard
                            </option>
                        </select>
                    </div>
                </div>
                <div className={'form-buttons'}>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                    {id !== null && <button type="button" onClick={handleDelete}>Delete</button>}
                    <button className={'submit-btn'} type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}