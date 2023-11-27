import React, { useState, useEffect, useRef } from 'react'
import styles from '../styles/index.module.css'
import { FaPen, FaUnlockKeyhole, FaUser, FaXmark } from 'react-icons/fa6'
import { Col, Row, Select } from 'antd'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProjectFunc, getCurrentProjectIndexFunc } from '../../../entities/BoardsR/BoardsReducer'
import { AppStateType } from '../../../entities/Store/store'




const Boards: React.FC<OwnProps> = () => {

    const dispatch = useDispatch()

    const allProjectsArr = useSelector((state: AppStateType) => state.boardsReducer.projectArr)

    const templateArr = [
        {
            id: 0,
            title: 'Template',
            type: 'Project Management',
        },
        {
            id: 1,
            title: 'Template',
            type: 'Kanban Template',
        },
        {
            id: 2,
            title: 'Template',
            type: 'Simple Project Board',
        },
        {
            id: 3,
            title: 'Template',
            type: 'Remote Team Hub',
        },
    ]

    const [newProjectModal, setNewProjectModal] = useState<boolean>(false)

    const [newProjectName, setNewProjectName] = useState<string>('')


    const createNewProjectCompFunc = () => {
        dispatch(addProjectFunc(newProjectName))
    }


    return (
        <>
            <div className={styles.boards_content}>


                <div className={styles.boards_content_container}>
                    <div className={styles.boards_content_container_in_item_1}>
                        <div className={styles.boards_content_container_in_item_1_1_item}>
                            <FaUser />
                        </div>
                        <div className={styles.boards_content_container_in_item_1_2_item}>
                            <div className={styles.boards_content_container_in_item_1_2_item_1_item}>
                                <div className={styles.boards_content_container_in_item_1_2_item_1_item_1_item}>
                                    Shushanik Mirzoyan's workspace
                                </div>
                                <div className={styles.boards_content_container_in_item_1_2_item_1_item_2_item}>
                                    <FaPen />
                                </div>
                            </div>
                            <div className={styles.boards_content_container_in_item_1_2_item_2_item}>
                                <FaUnlockKeyhole /> <span>Private</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.boards_content_container_in_item_2}>
                        <Row className={styles.boards_content_container_in_item_2_1_item}>
                            <Col span={12} className={styles.boards_content_container_in_item_2_1_item_1_item}>
                                Most popular templates
                            </Col>
                            <Col span={12} className={styles.boards_content_container_in_item_2_1_item_2_item}>
                                <FaXmark />
                            </Col>
                        </Row>
                        <div className={styles.boards_content_container_in_item_2_2_item}>
                            <div className={styles.boards_content_container_in_item_2_2_item_1_item}>
                                Get going faster with a template from the Trello community or
                            </div>
                            <div className={styles.boards_content_container_in_item_2_2_item_2_item}>
                                <Select
                                    labelInValue
                                    defaultValue={{ value: 'lucy', label: 'Lucy (101)' }}
                                    style={{ width: 120 }}
                                    options={[
                                        {
                                            value: 'jack',
                                            label: 'Jack (100)',
                                        },
                                        {
                                            value: 'lucy',
                                            label: 'Lucy (101)',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={styles.boards_content_container_in_item_2_3_item}>
                            <div className={styles.boards_content_container_in_item_2_3_item_1_item}>
                                {
                                    templateArr.map((val) => {
                                        return (
                                            <>
                                                <div key={val.id} className={styles.boards_content_container_in_item_2_3_item_1_item_1_item}>
                                                    <div className={styles.boards_content_container_in_item_2_3_item_1_item_1_item_2}>
                                                        {val.title}
                                                    </div>
                                                    <div className={styles.boards_content_container_in_item_2_3_item_1_item_1_item_1}>
                                                        {val.type}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>

                            <NavLink to={'/'}>
                                Browse the full template gallery
                            </NavLink>
                        </div>

                        <div className={styles.boards_content_container_in_item_2_4_item}>
                            <div className={styles.boards_content_container_in_item_2_4_item_1_item}>
                                <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_item}>
                                    <FaUser />
                                </div>
                                <div className={styles.boards_content_container_in_item_2_4_item_1_item_2_item}>
                                    Your boards
                                </div>
                            </div>

                            <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item}>
                                <div className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item_1_item}>

                                    {
                                        allProjectsArr.map((val) => {
                                            return (
                                                <NavLink onClick={() => dispatch(getCurrentProjectIndexFunc(val.id))} to={`/currentBoard/${val.id}`} >
                                                    {val.boardName}
                                                </NavLink>
                                            )
                                        })
                                    }
                                </div>

                                <div onClick={() => setNewProjectModal(true)} className={styles.boards_content_container_in_item_2_4_item_1_item_1_0_item_2_item}>
                                    Create new board
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {
                newProjectModal
                    ?
                    <div>
                        <div onClick={() => setNewProjectModal(false)}>
                            Close
                        </div>
                        <div onClick={() => {
                            setNewProjectModal(false)
                            createNewProjectCompFunc()
                        }
                        }>
                            Create
                        </div>
                        <input onChange={(e) => setNewProjectName(e.target.value)} />
                    </div>
                    :
                    null
            }


        </>
    )
}

type OwnProps = {}


export default Boards