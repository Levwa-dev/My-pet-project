const {unlink, unlinkSync, copyFile} = require('fs')
const path = require('path')

class FilesService {

    deleteAsyncFile (file, dir, subDir) {
        !subDir ? 
        unlink(path.resolve(__dirname, '..', 'public', dir, file), (err)=>{
            if(err) throw err
        })
            :
        unlink(path.resolve(__dirname, '..', 'public', dir, subDir, file), (err)=>{
            if(err) throw err
        })
    }

    deleteSyncFile (file, dir, subDir) {
        !subDir ?
            unlinkSync(path.resolve(__dirname, '..', 'public', dir, file))
                :
            unlinkSync(path.resolve(__dirname, '..', 'public', dir, subDir, file))
    }

    mockUploadPhotos (file, dir, subDir) {
        const imagesForTestingPath = path.resolve(__dirname, '..', "__tests__", 'images-for-testing', file)
        const pathToProductPhoto = !subDir ? 
            path.resolve(__dirname, '..', 'public', dir, file)
                :
            path.resolve(__dirname, '..', 'public', dir, subDir, file)
        copyFile(imagesForTestingPath, pathToProductPhoto, err=>{if(err) throw err})
    }

}

module.exports = new FilesService ()