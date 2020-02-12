from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path="")

@app.route("/page_<page_nr>")
def main(page_nr):
    return send_from_directory("", "page_"+page_nr+".html")

app.run(host="0.0.0.0", port=8080)