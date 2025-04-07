import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Button, Form, Image, Spin} from "antd";
import {getAllAwards} from "../../../state/award/awardsAction.ts";
import {unwrapResult} from "@reduxjs/toolkit";
import {Award} from "../../../types/award.ts";
import {TlaError} from "../../../utils/messages.ts";
import {setAward} from "../../../state/award/awardSlice.ts";
import DropdownSearch from "../../../common/dropdown-search.tsx";
import {getAllCategoryWithoutPagination} from "../../../state/category/categoryAction.ts";
import {Category} from "../../../types/category.ts";
import {getContestantResults} from "../../../state/contestant/contestantAction.ts";
import {Contestant} from "../../../types/contestant.ts";
import {useNavigate} from "react-router-dom";
import {MenuLinks} from "../../../utils/menu-links.ts";


const Results: React.FC = () => {
    const voteResult = useAppSelector(state => state.contestant.votingResult)
    const navigate = useNavigate();
    const [form] = Form.useForm<any>();
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const [awardId, setAwardId] = useState<number>(0);
    const [dataIsReady, setDataIsReady] = useState<boolean>(false);


    const onFinish = (values: any) => {
        setLoading(true);
        setDataIsReady(false);
        const filter = `categoryId=${values.categoryId}&isActive[eq]=1`;

        dispatch(getContestantResults(filter))
            .then(unwrapResult)
            .then((award: Award) => {
                dispatch(setAward(award));
                setLoading(false);
                setDataIsReady(true);
                setAwardId(0);
            })
            .catch((err) => {
                TlaError(err?.message ?? "")
                setLoading(false)
            })
    }


    const awardSelectHandler = (value: any) => {
        setAwardId(+value);
    }

    const goToContestantDetails = (uniqueCode: string) => {
        navigate(MenuLinks.home.contestantInfo.replace(":uniqueCode", uniqueCode));
    }



    return (
        <Spin spinning={loading} tip={'Please Wait...'}>

        <section className={'home-container'}>

            <div className="filter my-8 bg-white p-4 rounded-xl border"
                 style={{ maxWidth: "550px", textAlign: "center" }}>

                <div className={'col-span-2 grid grid-cols-1 gap-2'}>

                    <Form requiredMark={false} form={form} onFinish={onFinish} size={'large'} layout={"vertical"}>
                        <div className={'grid grid-cols-1 md:grid-cols-2 gap-2'}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: "Required"
                                    }
                                ]}
                                name={"awardId"} label={"Select Award *"}>
                                <DropdownSearch
                                    extraParams={`isActive[eq]=1&isVisible[eq]=1`}
                                    onChange={awardSelectHandler}
                                    object
                                    searchApi={getAllAwards}
                                    placeholder="Click to show awards"
                                    setResult={(award: Award) => {
                                        if (award) {
                                            form.setFieldValue('awardId', award.id)
                                            return
                                        }
                                        form.setFieldValue('awardId', null)
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                rules={[
                                {
                                    required: true,
                                    message: "Required"
                                }
                            ]}
                                name={"categoryId"} label={"Choose Category *"}>
                            <DropdownSearch
                                extraParams={`awardId[eq]=${awardId}&isActive[eq]=1&isVisible[eq]=1`}
                                object
                                disabled={(awardId == 0)}
                                searchApi={getAllCategoryWithoutPagination}
                                placeholder="Click to get categories"
                                setResult={(category: Category) => {
                                    if (category) {
                                        form.setFieldValue('categoryId', category.id)
                                        return;
                                    }
                                    form.setFieldValue('categoryId', null);
                                }}
                            />
                        </Form.Item>
                        </div>
                        <div className={''}>
                            <Button block className={'btn-red'} htmlType={"submit"}>
                                View Result
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>










            {/* table */}

            {dataIsReady && <div className={'rounded-2xl mb-20'}>
                <div className="relative overflow-x-auto bg-white p-4 rounded-xl border">
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
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Votes
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Position
                                </th>
                            </tr>
                            </thead>
                            <tbody>

                            { voteResult.map((contestant: Contestant) =>
                                <tr className="border-gray-200 text-gray-900 border-b text-left">
                                    <th scope="row" className="px-6 py-4 font-medium">
                                        <span onClick={() => goToContestantDetails(contestant.uniqueCode)} className={'underline cursor-pointer'}>
                                            {contestant.name}
                                        </span>
                                    </th>
                                    <td className="px-6 py-4">
                                        {contestant.stageName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`tel:*920*163#`}>
                                            <samp>{contestant.uniqueCode}</samp>
                                        </a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Image
                                            className={'thumbnail-img'}
                                            width={50} height={50}
                                            src={contestant?.thumbnail}
                                            preview={{ src: contestant?.image }}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        { contestant?.totalVoteCount }
                                    </td>
                                    <th className="px-6 py-4">
                                        {
                                            // @ts-ignore
                                            contestant?.position
                                        }
                                    </th>
                                </tr>)}


                            </tbody>
                        </table>

                </div>
            </div>}

        </section>
        </Spin>
    )
}

export default Results
