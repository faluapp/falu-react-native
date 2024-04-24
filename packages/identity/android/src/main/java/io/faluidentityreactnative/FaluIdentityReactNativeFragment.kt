package io.faluidentityreactnative

import android.net.Uri
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.fragment.app.Fragment
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableNativeMap
import io.falu.identity.FaluIdentityVerificationView
import io.falu.identity.IdentityVerificationCallback
import io.falu.identity.IdentityVerificationResult

class FaluIdentityReactNativeFragment : Fragment(), IdentityVerificationCallback {

  private lateinit var verificationView: FaluIdentityVerificationView
  private var promise: Promise? = null

  override fun onCreateView(
    inflater: LayoutInflater,
    container: ViewGroup?,
    savedInstanceState: Bundle?
  ): View {
    return FrameLayout(requireActivity()).also {
      it.visibility = View.GONE
    }
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    val verification = requireArguments().getString(VERIFICATION_ID).orEmpty()
    val temporaryKey = requireArguments().getString(TEMPORARY_KEY).orEmpty()

    val imageUri = requireArguments().getBundle(LOGO_URI)?.getString("uri").orEmpty()

    verificationView = FaluIdentityVerificationView.create(this, Uri.parse(imageUri), this)
    verificationView.open(
      verificationId = verification,
      temporaryKey = temporaryKey
    )
  }

  fun open(promise: Promise) {
    this.promise = promise
  }

  companion object {
    const val VERIFICATION_ID = "verification"
    const val TEMPORARY_KEY = "temporaryKey"
    const val LOGO_URI = "logo"
  }

  override fun onVerificationResult(result: IdentityVerificationResult) {
    promise?.let { promiseResult ->
      val nativeMap = WritableNativeMap()
      when (result) {
        IdentityVerificationResult.Succeeded -> {
          nativeMap.putString("result", "succeeded")
        }

        IdentityVerificationResult.Canceled -> {
          nativeMap.putString("result", "canceled")
        }

        is IdentityVerificationResult.Failed -> {
          nativeMap.putString("result", "failed")
        }
      }
      promiseResult.resolve(nativeMap)
    } ?: run {
      throw Exception("No promise is set to handle results")
    }
  }
}
