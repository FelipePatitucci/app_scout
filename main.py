from website import create_app

app = create_app()

if __name__ == '__main__':
    from os import environ
    app.run(debug=True, port=environ.get("PORT", 5000), host='0.0.0.0')
