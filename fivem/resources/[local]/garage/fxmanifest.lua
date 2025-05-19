fx_version 'cerulean'
game 'gta5'

author 'Azbito'
version '1.0.0'

server_scripts {
    'dist/server/*.js',
    'src/lua/server.lua'
}

client_scripts {
    'dist/client/*.js',
    'src/lua/client.lua'
}

files {
    'ui/dist/**/*'
}

ui_page 'ui/dist/index.html'

dependency 'chat'
