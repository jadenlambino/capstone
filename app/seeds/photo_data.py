import requests

def create_json(query):
    new_list = []
    api_url=f'https://api.unsplash.com/search/photos/?client_id=3Wj5IOgNev0nG0m-v8C6iRZQbVRaNRz9-Z4zDP0EJjA&query={query}'
    response = requests.get(api_url)
    dictionary = response.json()
    photos = dictionary['results']
    print(len(photos))
    for i in range (0 , 9):
        indiv=photos[i]
        new_list.append(indiv['urls']['small_s3'])
    print(new_list)

create_json('hoodies')
create_json('jeans')
create_json('pants')
create_json('shorts')
create_json('shoes')
create_json('hats')
create_json('accessories')
