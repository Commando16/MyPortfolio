from flask import Flask, render_template, redirect, request, url_for, json



f = open( "ContactAndSocialMedia.json", 'r')
ContactAndSocialMediaData = json.load(f)
f.close()



# insantiating Flask class object in variable "app" 
app = Flask(__name__)






@app.route('/', methods=['GET'])
def index():
    f = open( "ProjectsInfo.json", 'r')
    ProjectShowData = json.load(f)
    f.close()
    
    return render_template('index.html', ContactAndSocialMedia = ContactAndSocialMediaData, ProjectShow = ProjectShowData)


@app.route('/about', methods=['GET'])
def about():
    return render_template('about.html', ContactAndSocialMedia = ContactAndSocialMediaData)


@app.route('/contact', methods=['GET'])
def contact():
    return render_template('contact.html', ContactAndSocialMedia = ContactAndSocialMediaData)


@app.route('/blogShow/<string:id>', methods=['GET'])
def blogShow(id):
    f = open( "BlogsInfo.json", 'r')
    BlogShowData = json.load(f)
    f.close()

    #print(ProjectShowData)
    
    if id in BlogShowData:
        print("################ it have stuff #########################")
        BlogShowData = BlogShowData[id]
        print(BlogShowData)
        
    else:
        #print("$$$$$$$$$$$$$$$$ it dont have stuff $$$$$$$$$$$$$$$$$$$$$$$$$$")
        pass
    
    return render_template('blogShow.html', ContactAndSocialMedia = ContactAndSocialMediaData, BlogShow = BlogShowData)


@app.route('/projectShow/<string:id>', methods=['GET'])
def projectShow(id):

    f = open( "ProjectsInfo.json", 'r')
    ProjectShowData = json.load(f)
    f.close()

    #print(ProjectShowData)
    
    if id in ProjectShowData:
        #print("################ it have stuff #########################")
        ProjectShowData = ProjectShowData[id]
        print(ProjectShowData)
        
    else:
        #print("$$$$$$$$$$$$$$$$ it dont have stuff $$$$$$$$$$$$$$$$$$$$$$$$$$")
        pass
        
    
    return render_template('projectShow.html', ContactAndSocialMedia = ContactAndSocialMediaData, ProjectShow = ProjectShowData)






if __name__ == '__main__':
    app.debug = True
    app.run()
