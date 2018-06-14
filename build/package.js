import fs from 'fs'
import path from 'path'
import archiver from 'archiver'

const version = process.env.npm_package_version

const output = fs.createWriteStream(`${__dirname}/../releases/v${version}.zip`)

const archive = archiver('zip', {
  zlib: { level: 9 },
})

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`)
})

archive.on('warning', (error) => {
  if (error.code === 'ENOENT') {
    console.warn(JSON.stringify(error))
  } else {
    throw error
  }
})

archive.on('error', (error) => {
  throw error
})

archive.pipe(output)

archive.glob('**/!(*.map)', {
  cwd: path.resolve(__dirname, '../dist'),
})

archive.finalize()
