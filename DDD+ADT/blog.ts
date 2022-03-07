// 本演示代码为DDD+ADT的简单实现
// 纯DDD与DDD+ADT的代码的差别在于：
// 纯DDD是面向对象的，使用构造函数来封装数据和方法
// DDD+ADT是数据与方法分离的，本质上在表达领域驱动设计没有区别
type Drafted = {
    type: 'Drafted',
    content: string
}
type Reviewing = {
    type: 'Reviewing',
    content: string
}
type Posted = {
    type: 'Posted',
    content: string
}

const newArticle = (content:string) : Drafted => {
    return {
        content,
        type: 'Drafted'
    }
}

const edit = (article: Drafted, content: string) : Drafted => {
    return {
        ...article,
        content
    }
}

const submit = (article: Drafted) : Reviewing => {
    return {
        ...article,
        type: 'Reviewing'
    }
}

const approve = (article: Reviewing) : Posted => {
    return {
        ...article,
        type: 'Posted'
    }
}

const reject = (article: Reviewing) : Drafted => {
    return {
        ...article,
        type: 'Drafted'
    }
}

const view = (article: Posted) : string => {
    return article.content
}

const article = newArticle('测试文章')
const editedArticle = edit(article, '修改了文章')
const submitedArticle = submit(editedArticle)
const approvedArticle = approve(submitedArticle)
const rejectedArticle = reject(submitedArticle)
// 不可读
// const content = view(rejectedArticle)
const content = view(approvedArticle)