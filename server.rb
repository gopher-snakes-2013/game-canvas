require 'sinatra'

set :public_folder, File.join('.')

get '/' do
  send_file(File.join('index.html'))
end

get '/:filename' do
  send_file(File.join(filename))
end
