import json

def get_db_config(filename='config.conf', section='mysql'):
    # Lire le fichier JSON
    with open(filename, 'r') as file:
        config = json.load(file)
    
    # Vérifier si la section existe dans le fichier JSON
    if section in config:
        return config[section]
    else:
        raise Exception(f'Section {section} not found in the {filename} file')
