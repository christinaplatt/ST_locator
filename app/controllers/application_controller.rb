class ApplicationController < ActionController::Base

#sue looked at this to avoid merge conflicts only.
#no changes outside of comment

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authorize

  protect_from_forgery
  include ApplicationHelper
  helper_method :us_states
  helper_method :us_country
  def us_states
  	[
    ['AK', 'AK'],
    ['AL', 'AL'],
    ['AR', 'AR'],
    ['AZ', 'AZ'],
    ['CA', 'CA'],
    ['CO', 'CO'],
    ['CT', 'CT'],
    ['DC', 'DC'],
    ['DE', 'DE'],
    ['FL', 'FL'],
    ['GA', 'GA'],
    ['HI', 'HI'],
    ['IA', 'IA'],
    ['ID', 'ID'],
    ['IL', 'IL'],
    ['IN', 'IN'],
    ['KS', 'KS'],
    ['KY', 'KY'],
    ['LA', 'LA'],
    ['MA', 'MA'],
    ['MD', 'MD'],
    ['ME', 'ME'],
    ['MI', 'MI'],
    ['MN', 'MN'],
    ['MO', 'MO'],
    ['MS', 'MS'],
    ['MT', 'MT'],
    ['NC', 'NC'],
    ['ND', 'ND'],
    ['NE', 'NE'],
    ['NH', 'NH'],
    ['NJ', 'NJ'],
    ['NM', 'NM'],
    ['NV', 'NV'],
    ['NY', 'NY'],
    ['OH', 'OH'],
    ['OK', 'OK'],
    ['OR', 'OR'],
    ['PA', 'PA'],
    ['RI', 'RI'],
    ['SC', 'SC'],
    ['SD', 'SD'],
    ['TN', 'TN'],
    ['TX', 'TX'],
    ['UT', 'UT'],
    ['VA', 'VA'],
    ['VT', 'VT'],
    ['WA', 'WA'],
    ['WI', 'WI'],
    ['WV', 'WV'],
    ['WY', 'WY']
  ]
end

def us_country
    [
    ['US','US']
    ]
end

    private

    def authorize
        if params['controller'] == 'home' && (params['action'] == 'new' || params['action'] == 'index')
            return
        elsif params['controller'] == 'sessions' && params['action'] == 'create'
            return
        elsif session[:teacher_id].present? || session[:supervisor_id].present?
            return
        else
            redirect_to root_path
        end
    end
end
