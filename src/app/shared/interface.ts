// import { FILE_UPLOAD_STATUS,CLASSFICATION_STATUS} from './enum'
export interface IBlog {
        blogUrl?: string,
        category?: string,
        content?: string,
        coverImage?: string,
        createdBy?: string,
        createdDate?: string,
        preview?: string,
        publishingDate?: string,
        seo?: string,
        status?: string,
        tags?: string[],
        title?: string,
        updatedDate?: string,
        metaTitle?: string,
        metaDescription?: string,
        published?: boolean,
        active?: boolean,
        company?: string,
        coverImageUrl?: any,
        alternateImageName?:any
}

export interface ICareers {
        jobCode?:string,
        role?: string,
        content?: string,
        createdBy?: string,
        createdDate?: string,
        preview?: string,
        publishingDate?: string,
        status?: string,
        updatedDate?: string,
        metatitle?: string,
        metaDescription?: string,
        published?: boolean,
        active?: boolean,
        company?: string,
        expectedDateToJoin:string,
        experience:string,
        workLocation:string,
        workMode:string
}

export interface IPublishStatus {
        published?: string,
        draft?: string
}

export interface ICasestudy {
        title?: string,
        description?: string,
        clients?: string,
        category?: string[],
        coverImage?: string,
        status?: string,
        publishingDate?: string
}
export interface IService {
        title?: string
        serviceDescription?: string,
        img?: string,
        serviceBenefits?: string,
        sideImage?: string,
        subServices?: Array<{
                subtitle?: string,
                subimage?: string,
                subserviceDescription?: string,
        }>;
        // publishingDate?:string,
        // status?: string
}
export interface IContactUs {

}

export const Options = {
        plugins: {
        legend: {
                display: false
        }
        },
        scales: {
                x: {
                        min: 0,
                        max: 8,
                        grid: {
                                display: false
                        },
                },
                y: {
                        display: false,
                        grid: {
                                display: false
                        },
                }
        },
        elements: {
                line: {
                        tension: 0.3
                }
        }
};

export const DoughnutOptions = {
        plugins: {
                legend: {
                        display: false
                }
        },
};