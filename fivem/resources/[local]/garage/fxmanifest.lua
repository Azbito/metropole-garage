fx_version 'cerulean'
game 'gta5'

author 'Azbito'
version '1.0.0'

server_scripts {
    'dist/server/*.js'
}

client_scripts {
    'dist/client/*.js'
}

files {
    'ui/index.html',
    'ui/assets/*.js',
    'ui/assets/*.css',
    'ui/vite.svg'
}

ui_page 'ui/index.html'

dependency 'chat'
