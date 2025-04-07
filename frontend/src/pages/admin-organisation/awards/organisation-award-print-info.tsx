import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Button} from "antd";
import {FiFile} from "react-icons/fi";
import {getAllCategoriesWithContestant} from "../../../state/category/categoryAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import "../../../App.css";

const OrganisationAwardPrintInfo: React.FC = () => {
    const award: any = useAppSelector(state => state.award.awardItem);
    const categoryWithContestant: any = useAppSelector(state => state.category.categoryWithContestants);
    const dispatch = useAppDispatch();

    const handlePrint = () => {
        return window.print();
    };

    const fetchCategoryRecords = ()=>{
        const filter = `awardId=${award.id}`;
        dispatch(getAllCategoriesWithContestant(filter))
            .then(unwrapResult)
    }


    useEffect(() => {
        fetchCategoryRecords();
    }, []);


    return (
        <>
            <span className={'mb-2'}>
                <Button onClick={handlePrint} className={'btn btn-red no-print'} size={'large'}
                        icon={<FiFile/>}>Print Page</Button>
            </span>


            <div id={'printable-section'} className={'printable-content'}>
                <span className="text-3xl text-center block mt-2 mb-5">{award.name} Awards</span>

                <div className="bg-whitee rounded-2xl p-2">

                    <div className="....">

                        {categoryWithContestant.length && categoryWithContestant.map((item: any) => {
                            return <>
                                <p className={'text-2xl my-6 text-center'}>{item.category.name}</p>
                                <div className="relative overflow-x-auto bg-white rounded border">
                                    <table
                                        className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-600">
                                        <thead className=" border-b">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Stage Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Code
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Image
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {item.category.contestants.map((contestant: any) => <tr
                                            className="border-gray-200 text-gray-900 border-b">
                                            <th scope="row" className="px-6 py-4 font-medium">
                                                {contestant.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {contestant.stageName}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href={`tel:${contestant.code}`}>
                                                    <samp>{contestant.code}</samp>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                {contestant.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img style={{
                                                    width: 200,
                                                    height: 200,
                                                    borderRadius: '5px',
                                                }} src={contestant.thumbnail} alt={contestant.name}/>
                                            </td>
                                        </tr>)}


                                        </tbody>
                                    </table>
                                </div>
                            </>
                        })}


                        {/*{categoryWithContestant.length && categoryWithContestant.map(item => <>*/}
                        {/*    <p className={'text-2xl my-5'}>{item.category.name}</p>*/}
                        {/*    <div className="relative overflow-x-auto bg-white rounded border">*/}
                        {/*        <table*/}
                        {/*            className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-600">*/}
                        {/*            <thead className=" border-b">*/}
                        {/*            <tr>*/}
                        {/*                <th scope="col" className="px-6 py-3">*/}
                        {/*                    Name*/}
                        {/*                </th>*/}
                        {/*                <th scope="col" className="px-6 py-3">*/}
                        {/*                    Stage Name*/}
                        {/*                </th>*/}
                        {/*                <th scope="col" className="px-6 py-3">*/}
                        {/*                    Code*/}
                        {/*                </th>*/}
                        {/*                <th scope="col" className="px-6 py-3">*/}
                        {/*                    Image*/}
                        {/*                </th>*/}
                        {/*            </tr>*/}
                        {/*            </thead>*/}
                        {/*            <tbody>*/}

                        {/*            {item.contestants.map(contestant => <>*/}
                        {/*                <tr className="border-gray-200 text-gray-900">*/}
                        {/*                    <th scope="row" className="px-6 py-4 font-medium">*/}
                        {/*                        {contestant.name}*/}
                        {/*                    </th>*/}
                        {/*                    <td className="px-6 py-4">*/}
                        {/*                        {contestant.stageName}*/}
                        {/*                    </td>*/}
                        {/*                    <td className="px-6 py-4">*/}
                        {/*                        Laptop PC*/}
                        {/*                    </td>*/}
                        {/*                    <td className="px-6 py-4">*/}
                        {/*                        $1999*/}
                        {/*                    </td>*/}
                        {/*                </tr>*/}
                        {/*            </>)}*/}


                        {/*            </tbody>*/}
                        {/*        </table>*/}
                        {/*    </div>*/}
                        {/*</>)}*/}


                    </div>


                </div>


            </div>
        </>
    )
}

export default OrganisationAwardPrintInfo;
