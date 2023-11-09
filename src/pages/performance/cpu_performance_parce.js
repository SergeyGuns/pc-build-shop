const fs = require('fs')
const DIR = './cpu_performance'

const readFiles = async () => {
    const files = await fs.readdirSync(DIR)
    const result = {}
    const texts = await Promise.all( files.map(async (file)=> {
        return fs.readFileSync(DIR+'/'+file, 'utf-8').split('\r\n')
    }))
    const table = texts.reduce((acc,cur)=>[...acc, ...cur], [])
    table.map((el,i)=> {
        if(i % 2 === 0) {
            result[el] = table[i+1]
        }
    })
    return result
}

readFiles().then(result => {
    fs.writeFileSync('./performance_result.json', JSON.stringify(result, null, ' '))
})