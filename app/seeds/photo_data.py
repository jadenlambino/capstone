import requests
from types import SimpleNamespace

def create_json(query):
    api_url=f'https://api.unsplash.com/search/photos/?client_id=tJxMHKXfGEIYAJR0VkVg81ZkBI7YWXt4h71pT-I6bEQ&query={query}'
    response = requests.get(api_url)
    dictionary = response.json()
    photos = dictionary['results']
    for i in range (1 , 20):
        indiv=photos[i]
        print(indiv['urls']['small_s3'])

create_json('jacket')
