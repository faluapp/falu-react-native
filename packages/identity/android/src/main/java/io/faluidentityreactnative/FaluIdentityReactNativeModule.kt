package io.faluidentityreactnative

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.BaseActivityEventListener

class FaluIdentityReactNativeModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  private var identityFragment: FaluIdentityReactNativeFragment? = null
  private var initialized = false

  private val mActivityEventListener = object : BaseActivityEventListener() {
    override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
      if (initialized) {
        initialized = false
        identityFragment?.activity?.activityResultRegistry?.dispatchResult(requestCode, resultCode, data)
      }
    }
  }

  init {
    reactContext.addActivityEventListener(mActivityEventListener)
  }

  @ReactMethod
  fun initialize(readableMap: ReadableMap?, promise: Promise) {
    initialized = true
    val activity = currentActivity as AppCompatActivity? ?: return

    // If a fragment was already initialized, we want to remove it first
    identityFragment?.let {
      activity.supportFragmentManager.beginTransaction().remove(it).commitAllowingStateLoss()
    }
    identityFragment = FaluIdentityReactNativeFragment().also {
      val bundle = readableMap?.toBundle()
      it.arguments = bundle
    }

    activity.supportFragmentManager.beginTransaction()
      .add(
        requireNotNull(identityFragment),
        identityFragment?.tag
      )
      .commit()

    promise.resolve(null)
  }

  @ReactMethod
  fun open(promise: Promise) {
    identityFragment?.open(promise)
  }

  companion object {
    const val NAME = "FaluIdentityReactNative"
  }
}
