'use client'

import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";

const BlogCarousel = ({ dataSet, tab, extraClass }) => {
    const [staticTexts, setStaticTexts] = useState({});


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);

    if (dataSet.data.length < 1 || dataSet.sectionTitle==null) {
        return;
    }

    return (
        <>
            <section className={`${!tab ? 'blog-section' : ''} ${extraClass} pb-1  section d-lg-block d-none`}>
                <div className="container">
                    <div className="row justify-content-between" data-aos="fade-down">
                        <div className="col-md-3 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>
                                    {staticTexts[dataSet.buttonText]}
                                    <span>
                                        <img src="/img/slider-right-arrow.svg" className="img-fluid" alt="" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="owl-carousel owl-theme blog">
                        {
                            dataSet.data?.map((blog, index) => {
                                return <div className="card border-0" data-aos="slide-down" data-aos-duration="1000" key={index}>
                                    <div className="card-top">
                                        <a href={dataSet.baseUrl + "/blog/" + blog.slug}>
                                            <img src={blog.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + blog.featuredImage?.url : '/img/no-image.jpg'}
                                                className="img-fluid w-100" alt={blog?.name} />
                                        </a>
                                    </div>
                                    <div className="card-content">
                                        <a href={dataSet.baseUrl + "/blog/" + blog.slug}>
                                            <h4>{blog.title}</h4>
                                        </a>
                                        <p>{blog.shortDetails}</p>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                {blog.doctor[0]?.name && <strong>{`${blog.doctor[0]?.salutation?blog.doctor[0]?.salutation+" ":""}${blog.doctor[0]?.name}`}</strong>}
                                            </div>
                                            <div className="main-btn">
                                                <a href={dataSet.baseUrl + "/blog/" + blog.slug}>
                                                    {staticTexts['Read More']}
                                                    <span><i className="fa-solid fa-arrow-right"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>

            <section className="section blog-section d-lg-none d-block">
                <div className="container">
                    <div className="row justify-content-between" data-aos="fade-up">
                        <div className="col-md-3 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle} </h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                <a href={dataSet.buttonURL}>
                                    {dataSet.buttonText}
                                    <span>
                                        <img src="/img/slider-right-arrow.svg" className="img-fluid" alt="" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            {
                                dataSet.data?.map((blog, index) => {
                                    return index < 2
                                        ? <div className="blog-card" data-aos="fade-up" key={index}>
                                            <div className="row">
                                                <div className="col-6 my-auto">
                                                    <div className="testi-rightbox">
                                                        <a href={dataSet.baseUrl + "/blog/" + blog.slug}>
                                                            <h3>{blog.title}</h3>
                                                        </a>
                                                        <p>{blog.shortDetails}</p>
                                                        <div className="d-block align-items-center justify-content-between">
                                                            <div>
                                                                <strong>{blog.doctor[0]?.name}</strong>
                                                            </div>
                                                            <div className="main-btn mt-lg-0 mt-1">
                                                                <a href={dataSet.baseUrl + "/blog/" + blog.slug}>{staticTexts['Read More']}<span><i
                                                                    className="fa-solid fa-arrow-right"></i></span></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <a href={dataSet.baseUrl + "/blog/" + blog.slug}>
                                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${blog.featuredImage?.url}`}
                                                            className="img-fluid w-100" alt={blog.title} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                })
                            }

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default BlogCarousel;
