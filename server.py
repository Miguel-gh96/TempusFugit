#!/usr/bin/python
# -*- coding: utf-8 -*-
import tornado.httpserver
import tornado.ioloop
import tornado.web
import urlparse
import os
import tornado.httpclient
from tornado.options import define, options
from tornado import gen

define("port", default=8080, help="run on the given port", type=int)

# Global variables
ANGULAR_APP_PATH = os.path.join(os.path.dirname(__file__), "app")
INDEXFILE = '/'


class StaticHandler(tornado.web.RequestHandler):

    def get(self):

        # Parse query data to find out what was requested
        parsedParams = urlparse.urlparse(self.request.uri)

        # See if the file requested exists
        if os.access('.' + os.sep + parsedParams.path, os.R_OK):
            with open(ANGULAR_APP_PATH + "/index.html", 'r') as file:
                self.write(file.read())
        else:
            # print INDEXFILE+'#'+parsedParams.path
            # redirect to /#/param
            self.redirect(INDEXFILE+'#'+parsedParams.path)


class ApiHandler(tornado.web.RequestHandler):
    def initialize(self, foo):
        self.foo = foo

    @tornado.web.asynchronous
    @gen.coroutine
    def get(self):
        print "helloWorld"


if __name__ == "__main__":
    tornado.options.parse_command_line()

    # Route
    app = tornado.web.Application(handlers=[(r'/api/sports', ApiHandler, {}),
                                            (r'/bin/(.*)', tornado.web.StaticFileHandler, {'path': os.path.join(ANGULAR_APP_PATH, "bin")}),
                                            (r'/views/(.*)', tornado.web.StaticFileHandler, {'path': os.path.join(ANGULAR_APP_PATH, "views")}),
                                            (r'/.*', StaticHandler)
                                            ])

    # init server
    print "Server listening on:", options.port
    sockets = tornado.netutil.bind_sockets(options.port)
    tornado.process.fork_processes(0)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.add_sockets(sockets)
    tornado.ioloop.IOLoop.current().start()
